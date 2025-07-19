import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loginUserController } from '@/controllers/userController'
import { NextRequest } from 'next/server'
import { ReadableStream } from 'node:stream/web'
import * as userService from '@/services/userService'

function mockRequestBody(body: any): NextRequest {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(JSON.stringify(body)))
      controller.close()
    },
  })

  return new NextRequest('http://localhost/api/user/login', {
    method: 'POST',
    body: stream as any,
  })
}

describe('loginUserController', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should return user if email exists', async () => {
    const mockUser = { id: 1, email: 'test@example.com' }

    vi.spyOn(userService, 'loginUser').mockResolvedValue(mockUser as any)

    const req = mockRequestBody({ email: 'test@example.com' })
    const res = await loginUserController(req)

    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.user.email).toBe('test@example.com')
    expect(res.headers.getSetCookie()?.some((c) => c.includes('user_id=1'))).toBe(true)
  })

  it('should return 400 if email is missing', async () => {
    const req = mockRequestBody({})
    const res = await loginUserController(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.error).toBe('Email là bắt buộc')
  })

  it('should return 400 if user not found', async () => {
    vi.spyOn(userService, 'loginUser').mockRejectedValue(new Error('Không tìm thấy người dùng'))

    const req = mockRequestBody({ email: 'notfound@example.com' })
    const res = await loginUserController(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.error).toBe('Không tìm thấy người dùng')
  })
})
