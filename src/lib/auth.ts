/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: email },
                { phone: email }
              ]
            },
            include: { userRoles: { include: { role: true } } },
          });

          if (!user || !user.passwordHash) return null;

          if (!user.isActive) {
            throw new Error("This account has been deactivated or deleted.");
          }

          if (!user.isEmailVerified) {
            throw new Error("Please verify your email address before logging in.");
          }

          const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

          if (passwordsMatch) {
            // Mapping user roles to standard user object for session
            const roles = user.userRoles.map((ur) => ur.role.name);
            return {
              id: user.id,
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              image: user.avatarUrl,
            } as import("next-auth").User & { roles: string[] };
          }
        }

        return null;
      },
    }),
  ],
});
