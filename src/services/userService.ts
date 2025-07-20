// src/services/userService.ts
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function createUser(email?: string, name?: string, password?: string) {
  if (!name || name.length < 2) throw new Error('Tên không hợp lệ')
  if (!password || password.length < 6) throw new Error('Mật khẩu quá ngắn')

  const existingUser = email
    ? await prisma.user.findUnique({ where: { email } })
    : null

  if (existingUser) throw new Error('Email đã tồn tại')

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
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

export async function logoutUser() {
  return { message: 'Đã đăng xuất thành công' }
}