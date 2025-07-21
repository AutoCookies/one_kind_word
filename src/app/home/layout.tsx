'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import styles from '@/styles/home/layout.module.css'
import CreateMessage from '@/components/CreateMessage'

export default function HomeLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [showCreatePost, setShowCreatePost] = useState(false)

  const content = {
    logout: 'Đăng xuất',
    createMessage: 'Tạo lời nhắn',
    close: 'Đóng',
  }

  const text = {
    title: 'Tạo Lời Nhắn',
    description: 'Điền thông tin để tạo một lời nhắn mới.',
    button: 'Gửi Lời Nhắn',
    from: 'Từ',
    sendToFuture: 'Gửi đến tương lai',
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/user/logout', {
        method: 'POST',
      })

      const data = await res.json()

      if (res.ok && data.success) {
        router.push('/login')
      } else {
        alert(data.error || 'Đăng xuất thất bại')
      }
    } catch (err) {
      console.error('[LOGOUT_CLIENT_ERROR]', err)
      alert('Lỗi mạng hoặc server.')
    }
  }

  return (
    <>
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
    </>
  )
}
