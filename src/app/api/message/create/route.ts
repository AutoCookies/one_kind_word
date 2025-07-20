// src/app/api/message/random/route.ts
import { createMessageController } from '@/controllers/messageController'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  return createMessageController(req)
}

