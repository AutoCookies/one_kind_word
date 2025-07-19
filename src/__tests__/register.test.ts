// src/tests/user.test.ts
import { prisma } from '@/lib/prisma'
import { registerUser } from '@/controllers/userController'
import { NextRequest } from 'next/server'

beforeAll(async () => {
  await prisma.$connect()
})

afterAll(async () => {
  await prisma.user.deleteMany()
  await prisma.$disconnect()
})

describe('POST /api/user/register', () => {
  it('should register a new user successfully', async () => {
    const req = new Request('http://localhost/api/user/register', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        name: 'Test User',
        password: 'secure123',
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    const res = await registerUser(req as unknown as NextRequest)
    const json = await res.json()

    expect(res.status).toBe(201)
    expect(json.success).toBe(true)
    expect(json.user.email).toBe('test@example.com')
  })
})
