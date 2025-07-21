'use client'

import { useRouter, useParams } from 'next/navigation'
import { ReactNode, useState } from 'react'
import styles from '@/styles/vi/home/layout.module.css'
import CreateMessage from '@/components/CreateMessage'

export default function LocaleLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [showCreatePost, setShowCreatePost] = useState(false)

  const params = useParams()
  const locale = params?.locale as string
  const isVietnamese = locale === 'vi'

  const content = {
    logout: isVietnamese ? 'Đăng xuất' : 'Logout',
    createMessage: isVietnamese ? 'Tạo lời nhắn' : 'Create Message',
    close: isVietnamese ? 'Đóng' : 'Close',
  }

  const text = {
    title: isVietnamese ? 'Tạo Lời Nhắn' : 'Create Message',
    description: isVietnamese
      ? 'Điền thông tin để tạo một lời nhắn mới.'
      : 'Fill in the details to create a new message.',
    button: isVietnamese ? 'Gửi Lời Nhắn' : 'Send Message',
    from: isVietnamese ? 'Từ' : 'From',
    sendToFuture: isVietnamese ? 'Gửi đến tương lai' : 'Send to Future',
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/user/logout', {
        method: 'POST',
      })

      const data = await res.json()

      if (res.ok && data.success) {
        router.push(`/${locale}/login`)
      } else {
        alert(data.error || 'Đăng xuất thất bại')
      }
    } catch (err) {
      console.error('[LOGOUT_CLIENT_ERROR]', err)
      alert('Lỗi mạng hoặc server.')
    }
  }

  return (
    <html lang={locale}>
      <body>
        <header className={styles.header}>
          <nav>
            <button className={styles.button} onClick={handleLogout}>
              {content.logout}
            </button>
            <button
              className={styles.button}
              onClick={() => setShowCreatePost((prev) => !prev)}
            >
              {showCreatePost ? content.close : content.createMessage}
            </button>
          </nav>
        </header>
        <main className={styles.main}>
          {showCreatePost && (
            <div className={styles.popupContainer}>
              <CreateMessage text={text} />
            </div>
          )}
          {children}
        </main>
      </body>
    </html>
  )
}
