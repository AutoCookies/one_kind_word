'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/login/page.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Đăng nhập thất bại')

      alert('Đăng nhập thành công!')
      window.location.href = '/home'
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Có lỗi xảy ra'
      alert(message)
    }
  }

  return (
    <div className="login-page">
      <h1 className={styles.title}>Đăng nhập</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <span
            className={styles.toggle}
            onClick={() => setShowPassword((prev) => !prev)}
            role="button"
            aria-label="toggle password"
          >
            <Image
              className={styles.eye}
              src={showPassword ? '/vi/eye-svgrepo-com.svg' : '/vi/eye-closed-svgrepo-com.svg'}
              alt={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              width={20}
              height={20}
            />
          </span>
        </div>

        <button type="submit" className={styles.button}>
          Đăng nhập
        </button>

        <p className={styles.signup}>
          Bạn chưa có tài khoản?{' '}
          <button
            type="button"
            className={styles.askToSignup}
            onClick={() => (window.location.href = '/register')}
          >
            Đăng ký
          </button>
        </p>
      </form>
    </div>
  )
}
