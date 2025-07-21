import { NextRequest, NextResponse } from 'next/server'
import { createUser, loginUser } from '@/services/userService'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'
import { RegisterInput, LoginInput } from '@/types/user'

// Đăng ký người dùng
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
      const user = await createUser(email, name, password)

      return NextResponse.json({ success: true, user }, { status: 201 })
    }

    return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 })
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    console.error('[REGISTER_ERROR]', err.message)

    return NextResponse.json({ success: false, error: err.message }, { status: 400 })
  }
}

// Đăng nhập người dùng
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
        maxAge: 60 * 5, // 5 phút
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })

      response.cookies.set('refresh_token', refreshToken, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 ngày
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

// Đăng xuất
export async function logoutUserController() {
  try {
    const response = NextResponse.json({ success: true, message: 'Đã đăng xuất' })

    response.cookies.set('access_token', '', {
      path: '/',
      maxAge: 0,
    })

    response.cookies.set('refresh_token', '', {
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    console.error('[LOGOUT_ERROR]', err.message)

    return NextResponse.json({ success: false, error: err.message }, { status: 400 })
  }
}


