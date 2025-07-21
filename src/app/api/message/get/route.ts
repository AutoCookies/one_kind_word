// src/app/api/message/random/route.ts
import { randomMessageController } from '@/controllers/messageController'

export async function GET() {
  return randomMessageController()
}
