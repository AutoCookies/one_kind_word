// src/lib/jwt.ts
import jwt, { Secret, SignOptions } from 'jsonwebtoken'

const ACCESS_TOKEN_KEY = process.env.JWT_ACCESS_TOKEN_SECRET as Secret
const REFRESH_TOKEN_KEY = process.env.JWT_REFRESH_TOKEN_SECRET as Secret

if (!ACCESS_TOKEN_KEY || !REFRESH_TOKEN_KEY) {
  throw new Error('Missing JWT secret keys in environment variables')
}

const accessTokenOptions: SignOptions = {
  expiresIn: '5m',
}

const refreshTokenOptions: SignOptions = {
  expiresIn: '1d'
}


export function generateAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN_KEY, accessTokenOptions)
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_TOKEN_KEY, refreshTokenOptions)
}
