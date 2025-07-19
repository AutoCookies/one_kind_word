// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Tạo biến toàn cục để lưu PrismaClient trong quá trình dev
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'], // optional: bật log trong quá trình dev
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
