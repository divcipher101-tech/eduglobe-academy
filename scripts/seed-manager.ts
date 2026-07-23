import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Manager account for Mrs_Adeyinka...");

  const managerEmail = "Mrs_Adeyinka"; // Used as username
  const password = "@Adeyinka1";

  // Upsert the MANAGER role to ensure it exists (even though enum has it, it needs to be in the Role table)
  const managerRole = await prisma.role.upsert({
    where: { name: "MANAGER" },
    update: {},
    create: {
      name: "MANAGER",
      description: "Platform manager with view access and limited management capabilities",
    },
  });

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Upsert the User
  const managerUser = await prisma.user.upsert({
    where: { email: managerEmail },
    update: {
      passwordHash: passwordHash,
      isActive: true,
    },
    create: {
      email: managerEmail,
      firstName: "Mrs",
      lastName: "Adeyinka",
      passwordHash: passwordHash,
      isActive: true,
      isEmailVerified: true,
      userRoles: {
        create: {
          roleId: managerRole.id,
        },
      },
    },
  });

  console.log("Successfully seeded Manager account:");
  console.log(`Username (email field): ${managerUser.email}`);
  console.log(`Role: MANAGER`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
