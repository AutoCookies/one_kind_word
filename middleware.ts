import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_KEY!

export function middleware(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '')

  if (!accessToken) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
    
    return NextResponse.next()
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 401 })
  }
}

export const config = {
  matcher: ['/api/message/:path*'], 
}
