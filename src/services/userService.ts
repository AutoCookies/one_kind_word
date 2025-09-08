// src/services/userService.ts
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { Resend } from 'resend'
import redis from '@/lib/redis' // Redis client đã connect sẵn

const resend = new Resend(process.env.RESEND_ACCESS_KEY)

/**
 * Gửi OTP đến email và lưu tạm trong Redis
 */
export async function sendOTP(email: string, name: string, password: string) {
  if (!email) throw new Error('Email là bắt buộc')
  if (!name || name.length < 2) throw new Error('Tên không hợp lệ')
  if (!password || password.length < 6) throw new Error('Mật khẩu quá ngắn')

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) throw new Error('Email đã tồn tại')

  const otp = Math.floor(100000 + Math.random() * 900000).toString() // 6 chữ số
  const passwordHash = await bcrypt.hash(password, 10)

  // Lưu OTP + thông tin user trong Redis, hết hạn 5 phút
  const record = { otp, name, passwordHash }
  await redis.set(`otp:${email}`, JSON.stringify(record), { EX: 300 }) // 300 giây = 5 phút

  // Gửi OTP email
  const { data, error } = await resend.emails.send({
    from: 'Cookiescooker <no-reply@cookiescooker.click>',
    to: email,
    subject: 'Your Verify OTP Code',
    html: `Here is your OTP code: <strong>${otp}</strong>`,
  })

  if (error) throw new Error('Gửi OTP thất bại: ' + JSON.stringify(error))
  return { message: 'OTP đã gửi đến email của bạn' }
}

/**
 * Kiểm tra OTP và tạo user nếu đúng
 */
export async function verifyOtpAndCreateUser(email: string, otp: string) {
  const recordRaw = await redis.get(`otp:${email}`)
  if (!recordRaw) throw new Error('Không tìm thấy OTP cho email này')

  const record = JSON.parse(recordRaw)
  if (record.otp !== otp) throw new Error('OTP không hợp lệ')

  // Tạo user trong DB
  const user = await prisma.user.create({
    data: {
      email,
      name: record.name,
      password: record.passwordHash,
    },
  })

  // Xóa OTP đã dùng
  await redis.del(`otp:${email}`)

  return user
}

/**
 * Login
 */
export async function loginUser(email?: string) {
  if (!email) throw new Error('Email là bắt buộc')
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('Không tìm thấy người dùng')
  return user
}

/**
 * Logout
 */
export async function logoutUser() {
  return { message: 'Đã đăng xuất thành công' }
}
