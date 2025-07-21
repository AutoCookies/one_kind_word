import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loginUserController } from '@/controllers/userController'
import { NextRequest } from 'next/server'
import * as userService from '@/services/userService'
import { ReadableStream } from 'node:stream/web'

function mockRequestBody(body: object): NextRequest {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(JSON.stringify(body)))
      controller.close()
    },
  })

  return new NextRequest('http://localhost/api/user/login', {
    method: 'POST',
    body: stream as unknown as ReadableStream<Uint8Array>, // no `any` here
  })
}

describe('loginUserController', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should return user and set cookies if email exists', async () => {
    const mockUser = { id: 1, email: 'test@example.com' }

    vi.spyOn(userService, 'loginUser').mockResolvedValue(mockUser)
    vi.mocked(globalThis.crypto).randomUUID = () => 'mock-token'

    const req = mockRequestBody({ email: 'test@example.com' })
    const res = await loginUserController(req)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.user.email).toBe('test@example.com')

    const cookies = res.headers.getSetCookie()
    expect(cookies?.some((c) => c.includes('access_token'))).toBe(true)
    expect(cookies?.some((c) => c.includes('refresh_token'))).toBe(true)
  })

  it('should return 400 if email is missing in request body', async () => {
    const req = mockRequestBody({})
    const res = await loginUserController(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.error).toBe('Invalid input')
  })

  it('should return 400 if loginUser throws error', async () => {
    vi.spyOn(userService, 'loginUser').mockRejectedValue(new Error('Không tìm thấy người dùng'))

    const req = mockRequestBody({ email: 'notfound@example.com' })
    const res = await loginUserController(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.success).toBe(false)
    expect(json.error).toBe('Không tìm thấy người dùng')
  })
})
