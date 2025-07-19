'use client'

import styles from '@/styles/vi/login/page.module.css'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const params = useParams()
    const locale = params?.locale as string
    const isVietnamese = locale === 'vi'

    const content = {
        title: isVietnamese ? 'Đăng nhập' : 'Login',
        emailPlaceholder: isVietnamese ? 'Nhập email của bạn' : 'Enter your email',
        passwordPlaceholder: isVietnamese ? 'Nhập mật khẩu của bạn' : 'Enter your password',
        buttonText: isVietnamese ? 'Đăng nhập' : 'Login',
        signup: isVietnamese ? 'Đăng ký' : 'Register',
        askToSignup: isVietnamese ? 'Bạn chưa có tài khoản?' : 'Got no account?',
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Đăng nhập thất bại')

            alert(isVietnamese ? 'Đăng nhập thành công!' : 'Login successful!')
            window.location.href = `/${locale}/dashboard`

        } catch (err: any) {
            alert(err.message || (isVietnamese ? 'Có lỗi xảy ra' : 'Something went wrong'))
        }
    }

    return (
        <div className="login-page">
            <h1 className={styles.title}>{content.title}</h1>
            <form className={styles.form} onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder={content.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />

                <div className={styles.passwordWrapper}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder={content.passwordPlaceholder}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <span
                        className={styles.toggle}
                        onClick={() => setShowPassword(prev => !prev)}
                        role="button"
                        aria-label="toggle password"
                    >
                        {showPassword
                            ? <img className={styles.eye} src="eye-svgrepo-com.svg" alt="Hide password" />
                            : <img className={styles.eye} src="eye-closed-svgrepo-com.svg" alt="Show password" />}
                    </span>
                </div>

                <button type="submit" className={styles.button}>
                    {content.buttonText}
                </button>
                <p className={styles.signup}>
                    {content.askToSignup} <a className={styles.askToSignup} onClick={() => window.location.href = `/${locale}/register`}>
                        {content.signup}
                    </a>
                </p>
            </form>
        </div>
    )
}
