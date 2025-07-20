// src/controllers/messageController.ts
import { NextRequest, NextResponse } from 'next/server'
import { getRandomMessage, createMessage } from '@/services/messageService'

export async function randomMessageController (req: NextRequest) {
    try {
        const message = await getRandomMessage()

        if (!message) {
            return NextResponse.json({ success: false, error: 'Không có tin'})
        }

        return NextResponse.json({ success: true, message })
        
    } catch (error: any) {
        console.error('[RANDOM_MESSAGE_ERROR]', error.message)
        return NextResponse.json(
            { success: false, error: error.message || 'Lỗi server' },
            { status: 500 }
        )
    }
}

export async function createMessageController(req: NextRequest) {
    try {
        const data = await req.json()
        const message = await createMessage(data)

        return NextResponse.json({ success: true, message })
        
    } catch (error: any) {
        console.error('[CREATE_MESSAGE_ERROR]', error.message)
        return NextResponse.json(
            { success: false, error: error.message || 'Lỗi server' },
            { status: 500 }
        )
    }
}