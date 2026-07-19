import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@eduglobe.com";
  
  // Create admin role if not exists
  let adminRole = await prisma.role.findUnique({ where: { name: "ADMIN" } });
  if (!adminRole) {
    adminRole = await prisma.role.create({ data: { name: "ADMIN", description: "System Administrator" } });
  }

  // Create or update admin user
  const passwordHash = await bcrypt.hash("AdminPassword123!", 10);
  
  let adminUser = await prisma.user.findUnique({ where: { email } });
  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName: "Super",
        lastName: "Admin",
      }
    });
    console.log("Admin user created.");
  } else {
    adminUser = await prisma.user.update({
      where: { email },
      data: { passwordHash } // reset password just in case
    });
    console.log("Admin user already exists. Password reset.");
  }

  // Ensure role mapping exists
  const roleMapping = await prisma.userRole.findUnique({
    where: {
      userId_roleId_branchId: {
        userId: adminUser.id,
        roleId: adminRole.id,
        branchId: "" // handle if needed, prisma schema might not allow empty string if it's optional, let's use findFirst
      }
    }
  }).catch(() => null);

  const existingMapping = await prisma.userRole.findFirst({
    where: { userId: adminUser.id, roleId: adminRole.id }
  });

  if (!existingMapping) {
    await prisma.userRole.create({
      data: {
        userId: adminUser.id,
        roleId: adminRole.id,
      }
    });
    console.log("Admin role assigned to user.");
  } else {
    console.log("Admin role already assigned.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
