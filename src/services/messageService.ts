import { prisma } from '@/lib/prisma';

export async function getRandomMessage() {
    const count = await prisma.message.count({
        where: { isPublic: true}
    });

    if (count === 0) {
        return null;
    }

    const skip = Math.floor(Math.random() * count);
    const message = await prisma.message.findFirst({
        where: { isPublic: true },
        skip,
        take: 1,
        orderBy: { createdAt: 'desc' }
    });

    return message;
}