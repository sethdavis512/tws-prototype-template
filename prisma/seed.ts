import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
    const email = 'sethdavis512@gmail.com';

    // cleanup the existing database
    await prisma.user.deleteMany().catch(() => {});
    await prisma.password.deleteMany().catch(() => {});
    await prisma.profile.deleteMany().catch(() => {});

    const hashedPassword = await bcrypt.hash('asdfasdf', 10);

    await prisma.user.create({
        data: {
            email,
            password: {
                create: {
                    hash: hashedPassword
                }
            },
            profile: {
                create: {
                    bio: 'I like Remix',
                    username: 'ElectricHedgehog',
                    firstName: 'Seth',
                    lastName: 'Davis'
                }
            }
        }
    });

    console.log(`Database has been seeded. 🌱`);
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
