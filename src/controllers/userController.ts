import { NextRequest, NextResponse } from 'next/server'
import { sendOTP, verifyOtpAndCreateUser, loginUser } from '@/services/userService'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'
import { RegisterInput, VerifyOtpInput, LoginInput } from '@/types/user'

// Bước 1: Gửi OTP khi đăng ký
export async function registerUser(req: NextRequest) {
  try {
    const body = (await req.json()) as unknown

    if (
      typeof body === 'object' &&
      body !== null &&
      'email' in body &&
      'name' in body &&
      'password' in body
    ) {
      const { email, name, password } = body as RegisterInput

      // Gọi service gửi OTP
      await sendOTP(email, name, password)

      return NextResponse.json({
        success: true,
        message: 'OTP đã gửi đến email của bạn. Vui lòng xác nhận OTP để hoàn tất đăng ký.',
      })
    }

    return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 })
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    console.error('[REGISTER_ERROR]', err.message)

    return NextResponse.json({ success: false, error: err.message }, { status: 400 })
  }
}

// Bước 2: Xác thực OTP & tạo user
export async function verifyOtpAndRegisterUser(req: NextRequest) {
  try {
    const body = (await req.json()) as unknown

    if (
      typeof body === 'object' &&
      body !== null &&
      'email' in body &&
      'otp' in body
    ) {
      const { email, otp } = body as VerifyOtpInput

      const user = await verifyOtpAndCreateUser(email, otp)

      return NextResponse.json({ success: true, user }, { status: 201 })
    }

    return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 })
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    console.error('[VERIFY_OTP_ERROR]', err.message)

    return NextResponse.json({ success: false, error: err.message }, { status: 400 })
  }
}

// Login & Logout giữ nguyên
export async function loginUserController(req: NextRequest) {
  try {
    const body = (await req.json()) as unknown

    if (
      typeof body === 'object' &&
      body !== null &&
      'email' in body
    ) {
      const { email } = body as LoginInput
      const user = await loginUser(email)

      const accessToken = generateAccessToken({ userId: user.id })
      const refreshToken = generateRefreshToken({ userId: user.id })

      const response = NextResponse.json({
        success: true,
        user,
        accessToken,
      })

      response.cookies.set('access_token', accessToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 5,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })

      response.cookies.set('refresh_token', refreshToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })

      return response
    }

    return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 })
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    console.error('[LOGIN_ERROR]', err.message)

    return NextResponse.json({ success: false, error: err.message }, { status: 400 })
  }
}

export async function logoutUserController() {
  try {
    const response = NextResponse.json({ success: true, message: 'Đã đăng xuất' })

    response.cookies.set('access_token', '', { path: '/', maxAge: 0 })
    response.cookies.set('refresh_token', '', { path: '/', maxAge: 0 })

    return response
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    console.error('[LOGOUT_ERROR]', err.message)

    return NextResponse.json({ success: false, error: err.message }, { status: 400 })
  }
}
