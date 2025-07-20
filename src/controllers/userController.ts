// src/controllers/userController.ts
import { NextRequest, NextResponse } from 'next/server'
import { createUser, loginUser, logoutUser } from '@/services/userService'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'

export async function registerUser(req: NextRequest) {
  try {
    const { email, name, password } = await req.json()

    const user = await createUser(email, name, password)

    return NextResponse.json({ success: true, user }, { status: 201 })
  } catch (error: any) {
    console.error('[REGISTER_ERROR]', error.message)
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi server' },
      { status: 400 }
    )
  }
}

export async function loginUserController(req: NextRequest) {
  try {
    const { email } = await req.json()

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
  } catch (error: any) {
    console.error('[LOGIN_ERROR]', error.message)
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi server' },
      { status: 400 }
    )
  }
}

export async function logoutUserController(req: NextRequest) {
  try {
    const response = NextResponse.json({ success: true, message: 'Đã đăng xuất' })

    // Xóa cookie bằng cách set lại với maxAge = 0
    response.cookies.set('access_token', '', {
      path: '/',
      maxAge: 0,
    })
    response.cookies.set('refresh_token', '', {
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (error: any) {
    console.error('[LOGOUT_ERROR]', error.message)
    return NextResponse.json(
      { success: false, error: error.message || 'Lỗi server' },
      { status: 400 }
    )
  }
}

