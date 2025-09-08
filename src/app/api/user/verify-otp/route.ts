import { NextRequest, NextResponse } from 'next/server'
import { verifyOtpAndRegisterUser } from '@/controllers/userController'

export async function POST(req: NextRequest) {
  return verifyOtpAndRegisterUser(req)
}
