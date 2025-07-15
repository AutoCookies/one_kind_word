// src/app/api/message/random/route.ts
import { randomMessageController } from '@/controllers/messageController'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  return randomMessageController(req)
}
