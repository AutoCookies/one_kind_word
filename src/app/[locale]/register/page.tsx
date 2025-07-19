'use client'

import styles from '@/styles/vi/register/page.module.css'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [seenPassword, setSeenPassword] = useState(false)
    const [seenConfirmPassword, setSeenConfirmPassword] = useState(false)

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

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{content.title}</h1>
            <form className={styles.form}>
                <input
                    className={styles.input}
                    type='email'
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
                    >
                        {seenPassword ? <img className={styles.eye} src='eye-svgrepo-com.svg'></img> : <img className={styles.eye} src='eye-closed-svgrepo-com.svg'></img>}
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
                    >
                        {seenConfirmPassword ? <img className={styles.eye} src='eye-svgrepo-com.svg'></img> : <img className={styles.eye} src='eye-closed-svgrepo-com.svg'></img>}
                    </span>
                </div>

                <span className={styles.signin}>{content.askToSignin} <a className={styles.signinLink} onClick={() => window.location.href = `/${locale}/login`}>{content.signin}</a></span>

                <button className={styles.button} type='submit'>
                    {content.buttonText}
                </button>
            </form>
        </div>
    )
}
