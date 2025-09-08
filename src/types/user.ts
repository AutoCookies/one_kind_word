export interface RegisterInput {
  email: string
  name: string
  password: string
}

export interface LoginInput {
  email: string
}

export interface VerifyOtpInput {
  email: string
  otp: string
}