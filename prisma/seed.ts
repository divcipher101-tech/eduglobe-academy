import { PrismaClient, RoleName } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Roles
  const rolesData = [
    { name: RoleName.STUDENT, description: 'Student role' },
    { name: RoleName.TUTOR, description: 'Tutor role' },
    { name: RoleName.PARENT, description: 'Parent role' },
    { name: RoleName.ADMIN, description: 'System Administrator' },
    { name: RoleName.BRANCH_MANAGER, description: 'Branch Manager' },
  ];

  console.log('Upserting roles...');
  for (const role of rolesData) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  // 2. Create Global Branch (HQ)
  console.log('Upserting HQ Branch...');
  const hqBranch = await prisma.branch.upsert({
    where: { code: 'HQ' },
    update: {},
    create: {
      name: 'EduGlobe HQ',
      code: 'HQ',
      city: 'London',
      country: 'UK',
      timezone: 'Europe/London',
    },
  });

  // 3. Create Admin User
  const adminEmail = 'admin@eduglobe.academy';
  const adminPassword = await bcrypt.hash('admin123', 10);

  console.log('Upserting Admin user...');
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminPassword,
      firstName: 'System',
      lastName: 'Admin',
      isActive: true,
      isEmailVerified: true,
    },
  });

  // 4. Assign ADMIN role to the user
  const adminRole = await prisma.role.findUnique({
    where: { name: RoleName.ADMIN },
  });

  if (adminRole) {
    console.log('Assigning Admin role to user...');
    const existingUserRole = await prisma.userRole.findFirst({
      where: {
        userId: adminUser.id,
        roleId: adminRole.id,
        branchId: null,
      },
    });

    if (!existingUserRole) {
      await prisma.userRole.create({
        data: {
          userId: adminUser.id,
          roleId: adminRole.id,
          branchId: null,
        },
      });
    }
  }

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
