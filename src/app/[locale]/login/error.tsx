'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import styles from '../../../styles/vi/error.module.css'

export default function LocaleError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()
  const params = useParams()
  const locale = params?.locale as string
  const isVietnamese = locale === 'vi'

  useEffect(() => {
    console.error('❌ Error caught by error.tsx:', error)
  }, [error])

  return (
    <div className={styles.errorWrapper}>
      <h1 className={styles.title}>
        {isVietnamese ? 'Đã xảy ra lỗi 😢' : 'Something went wrong 😢'}
      </h1>
      <p className={styles.message}>
        {isVietnamese
          ? 'Chúng tôi xin lỗi vì sự bất tiện. Hãy thử lại hoặc quay về trang chủ.'
          : 'We’re sorry for the inconvenience. Please try again or go back to the homepage.'}
      </p>

      <div className={styles.actions}>
        <button className={styles.button} onClick={() => reset()}>
          {isVietnamese ? 'Thử lại' : 'Try again'}
        </button>
        <button className={styles.button} onClick={() => router.push(`/${locale}`)}>
          {isVietnamese ? 'Về trang chủ' : 'Go Home'}
        </button>
      </div>
    </div>
  )
}
