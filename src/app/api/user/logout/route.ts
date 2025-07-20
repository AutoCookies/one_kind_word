// src/app/api/user/register/route.ts
import { logoutUserController } from '@/controllers/userController'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  return logoutUserController(req)
}
