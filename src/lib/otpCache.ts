// lib/otpCache.ts
const otpCache = new Map<
  string,
  { otp: string; name: string; passwordHash: string; expiresAt: number }
>()

export function setOtp(email: string, otp: string, name: string, passwordHash: string) {
  otpCache.set(email, {
    otp,
    name,
    passwordHash,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 phút
  })
}

export function getOtp(email: string) {
  const record = otpCache.get(email)
  if (!record) return null
  if (Date.now() > record.expiresAt) {
    otpCache.delete(email)
    return null
  }
  return record
}

export function deleteOtp(email: string) {
  otpCache.delete(email)
}

export { otpCache }
