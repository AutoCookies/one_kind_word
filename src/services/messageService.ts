import { prisma } from '@/lib/prisma';

export async function getRandomMessage() {
    const count = await prisma.message.count({
        where: { isPublic: true }
    });

    if (count === 0) {
        return null;
    }

    const skip = Math.floor(Math.random() * count);
    const message = await prisma.message.findFirst({
        where: {
            isPublic: true,
            OR: [
                { toFuture: false },
                { toFuture: true, sendAt: { lte: new Date() } },
            ]
        },
        skip,
        take: 1,
        select: {
            id: true,
            content: true,
            from: true,
            createdAt: true,
        }
    });

    return message;
}

export async function createMessage(data: {
    content: string;
    from: string;
    toFuture: boolean;
    sendAt?: Date;
}) {
    const { content, from, toFuture, sendAt} = data;

    const message = await prisma.message.create({
        data: {
            content,
            from,
            isPublic: true,
            toFuture,
            sendAt: toFuture ? sendAt : null,
        },
        select: {
            id: true,
            content: true,
            from: true,
            createdAt: true,
        }
    });

    return message;
}