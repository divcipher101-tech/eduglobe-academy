"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getConversations() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: session.user.id
        }
      }
    },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true }
          }
        }
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1, // Get latest message for preview
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  });

  return conversations;
}

export async function getMessages(conversationId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Verify participation
  const isParticipant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId: session.user.id
      }
    }
  });

  if (!isParticipant) throw new Error("Unauthorized access to conversation");

  const messages = await prisma.message.findMany({
    where: { conversationId },
    include: {
      sender: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true }
      }
    },
    orderBy: { createdAt: "asc" }
  });

  return messages;
}

export async function sendMessage(conversationId: string, body: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  if (!body.trim()) throw new Error("Message cannot be empty");

  // Verify participation
  const isParticipant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId: session.user.id
      }
    }
  });

  if (!isParticipant) throw new Error("Unauthorized access to conversation");

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId: session.user.id,
      body: body.trim(),
    },
    include: {
      sender: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true }
      }
    }
  });

  // Update conversation updatedAt so it floats to the top
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() }
  });

  // revalidatePath handles standard Next.js cache purging, but for real-time we'll use SWR polling.
  // Still good practice to revalidate.
  revalidatePath("/(dashboard)/student/messages", "page");
  revalidatePath("/(dashboard)/tutor/messages", "page");
  revalidatePath("/(dashboard)/parent/messages", "page");
  revalidatePath("/(dashboard)/admin/messages", "page");

  return message;
}

export async function startDirectConversation(otherUserId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  // Check if conversation already exists between these exactly two users
  const existing = await prisma.conversation.findFirst({
    where: {
      conversationType: "DIRECT",
      participants: {
        every: {
          userId: { in: [session.user.id, otherUserId] }
        }
      }
    }
  });

  if (existing) return existing;

  const newConvo = await prisma.conversation.create({
    data: {
      conversationType: "DIRECT",
      createdById: session.user.id,
      participants: {
        create: [
          { userId: session.user.id },
          { userId: otherUserId }
        ]
      }
    }
  });

  return newConvo;
}
