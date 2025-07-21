'use client'

import styles from '@/styles/vi/register/page.module.css'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [seenPassword, setSeenPassword] = useState(false)
  const [seenConfirmPassword, setSeenConfirmPassword] = useState(false)
  const [name, setName] = useState('')

  const params = useParams()
  const locale = params?.locale as string
  const isVietnamese = locale === 'vi'

  const content = {
    title: isVietnamese ? 'Đăng ký' : 'Register',
    emailPlaceholder: isVietnamese ? 'Nhập email của bạn' : 'Enter your email',
    passwordPlaceholder: isVietnamese ? 'Nhập mật khẩu của bạn' : 'Enter your password',
    confirmPasswordPlaceholder: isVietnamese ? 'Xác nhận mật khẩu' : 'Confirm password',
    buttonText: isVietnamese ? 'Đăng ký' : 'Register',
    signin: isVietnamese ? 'Đăng nhập' : 'Sign in',
    askToSignin: isVietnamese ? 'Bạn đã có tài khoản?' : 'Already have an account?',
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert(isVietnamese ? 'Mật khẩu xác nhận không khớp' : 'Passwords do not match')
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

      alert(isVietnamese ? 'Đăng ký thành công!' : 'Registration successful!')
      window.location.href = `/${locale}/login`
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Something went wrong'
      alert(error)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{content.title}</h1>
      <form className={styles.form} onSubmit={handleRegister}>
        <input
          className={styles.input}
          type="text"
          placeholder={isVietnamese ? 'Nhập tên của bạn' : 'Enter your name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={styles.input}
          type="email"
          placeholder={content.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className={styles.passwordWrapper}>
          <input
            className={styles.input}
            type={seenPassword ? 'text' : 'password'}
            placeholder={content.passwordPlaceholder}
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
            placeholder={content.confirmPasswordPlaceholder}
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
          {content.askToSignin}{' '}
          <a
            className={styles.signinLink}
            onClick={() => (window.location.href = `/${locale}/login`)}
            role="link"
          >
            {content.signin}
          </a>
        </span>

        <button className={styles.button} type="submit">
          {content.buttonText}
        </button>
      </form>
    </div>
  )
}
