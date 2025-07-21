'use client'

import styles from '@/styles/register/page.module.css'
import { useState } from 'react'
import Image from 'next/image'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [seenPassword, setSeenPassword] = useState(false)
  const [seenConfirmPassword, setSeenConfirmPassword] = useState(false)
  const [name, setName] = useState('')

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp')
      return
    }

    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      })

      const data: { error?: string } = await res.json()

      if (!res.ok) throw new Error(data.error || 'Đăng ký thất bại')

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
      <form className={styles.form} onSubmit={handleRegister}>
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
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className={styles.toggle}
            onClick={() => setSeenPassword(!seenPassword)}
            role="button"
            aria-label="toggle password"
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
            aria-label="toggle confirm password"
            tabIndex={0}
          >
            <Image
              className={styles.eye}
              src={seenConfirmPassword ? '/vi/eye-svgrepo-com.svg' : '/vi/eye-closed-svgrepo-com.svg'}
              alt={seenConfirmPassword ? 'Ẩn xác nhận mật khẩu' : 'Hiện xác nhận mật khẩu'}
              width={24}
              height={24}
            />
          </span>
        </div>

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

        <button className={styles.button} type="submit">
          Đăng ký
        </button>
      </form>
    </div>
  )
}
