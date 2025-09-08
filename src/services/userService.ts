import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { Resend } from 'resend'
import { randomInt } from 'crypto'

const resend = new Resend(process.env.RESEND_ACCESS_KEY)

/**
 * Gửi OTP đến email và lưu tạm trong DB (5 phút)
 */
export async function sendOTP(email: string, name: string, password: string) {
  if (!email) throw new Error('Email là bắt buộc')
  if (!name || name.length < 2) throw new Error('Tên không hợp lệ')
  if (!password || password.length < 6) throw new Error('Mật khẩu quá ngắn')

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) throw new Error('Email đã tồn tại')

  const otp = randomInt(100000, 999999).toString()
  const passwordHash = await bcrypt.hash(password, 10)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 phút

  // Upsert để mỗi email chỉ giữ 1 OTP (gửi lại sẽ ghi đè)
  await prisma.otpVerification.upsert({
    where: { email },
    update: { otp, name, passwordHash, expiresAt },
    create: { email, otp, name, passwordHash, expiresAt },
  })

  // Gửi OTP email
  const { error } = await resend.emails.send({
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
  const record = await prisma.otpVerification.findUnique({ where: { email } })
  if (!record) throw new Error('Không tìm thấy OTP cho email này')
  if (record.expiresAt < new Date()) throw new Error('OTP đã hết hạn')
  if (record.otp !== otp) throw new Error('OTP không hợp lệ')

  const user = await prisma.user.create({
    data: {
      email,
      name: record.name,
      password: record.passwordHash,
    },
  })

  // Xoá OTP đã dùng
  await prisma.otpVerification.delete({ where: { email } })

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
