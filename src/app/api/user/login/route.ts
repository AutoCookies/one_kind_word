// src/app/api/user/login/route.ts
import { loginUserController } from '@/controllers/userController'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  return loginUserController(req)
}
