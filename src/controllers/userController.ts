// src/controllers/userController.ts
import { NextRequest, NextResponse } from 'next/server'
import { createUser, loginUser } from '@/services/userService'

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

    const response = NextResponse.json({ success: true, user })

    response.cookies.set('user_id', user.id.toString(), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 ngày
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


