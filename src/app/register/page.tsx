'use client'

import styles from '@/styles/register/page.module.css'
import { useState } from 'react'
import Image from 'next/image'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [seenPassword, setSeenPassword] = useState(false)
  const [seenConfirmPassword, setSeenConfirmPassword] = useState(false)

  // Bước 1: Gửi OTP
  const handleSendOtp = async () => {
    if (!email || !name || !password) return alert('Điền đầy đủ thông tin')
    if (password !== confirmPassword) return alert('Mật khẩu xác nhận không khớp')

    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gửi OTP thất bại')

      alert('OTP đã gửi đến email của bạn')
      setStep('otp')
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Đã xảy ra lỗi'
      alert(error)
    }
  }

  // Bước 2: Xác thực OTP & tạo user
  const handleVerifyOtp = async () => {
    if (!otp) return alert('Nhập OTP')

    try {
      const res = await fetch('/api/user/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Xác thực OTP thất bại')

      alert('Đăng ký thành công!')
      window.location.href = '/login'
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Đã xảy ra lỗi'
      alert(error)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Đăng ký</h1>

      {step === 'form' ? (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={seenPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={styles.toggle}
              onClick={() => setSeenPassword(!seenPassword)}
              role="button"
              tabIndex={0}
            >
              <Image
                className={styles.eye}
                src={seenPassword ? '/vi/eye-svgrepo-com.svg' : '/vi/eye-closed-svgrepo-com.svg'}
                alt={seenPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                width={24}
                height={24}
              />
            </span>
          </div>

          <div className={styles.passwordWrapper}>
            <input
              className={styles.input}
              type={seenConfirmPassword ? 'text' : 'password'}
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className={styles.toggle}
              onClick={() => setSeenConfirmPassword(!seenConfirmPassword)}
              role="button"
              tabIndex={0}
            >
              <Image
                className={styles.eye}
                src={seenConfirmPassword ? '/vi/eye-svgrepo-com.svg' : '/vi/eye-closed-svgrepo-com.svg'}
                alt={seenConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                width={24}
                height={24}
              />
            </span>
          </div>

          <button type="button" className={styles.button} onClick={handleSendOtp}>
            Gửi OTP
          </button>
        </form>
      ) : (
        <div className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Nhập OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="button" className={styles.button} onClick={handleVerifyOtp}>
            Xác nhận đăng ký
          </button>
        </div>
      )}

      <span className={styles.signin}>
        Bạn đã có tài khoản?{' '}
        <a
          className={styles.signinLink}
          onClick={() => (window.location.href = '/login')}
          role="link"
        >
          Đăng nhập
        </a>
      </span>
    </div>
  )
}
