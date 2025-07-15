// src/services/userService.ts
import { prisma } from '@/lib/prisma'

export async function createUser(email?: string, name?: string) {
  if (!name || name.length < 2) {
    throw new Error('Tên không hợp lệ')
  }

  const existingUser = email
    ? await prisma.user.findUnique({ where: { email } })
    : null

  if (existingUser) {
    throw new Error('Email đã tồn tại')
  }

  const user = await prisma.user.create({
    data: { email, name },
  })

  return user
}

export async function loginUser(email?: string) {
  if (!email) {
    throw new Error('Email là bắt buộc')
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw new Error('Không tìm thấy người dùng')
  }

  return user
}