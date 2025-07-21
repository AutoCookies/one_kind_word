'use client'

import styles from '@/styles/home/page.module.css'
import { useEffect, useState } from 'react'
import MessageCard from '@/components/MessageCard'

interface Message {
  id: number
  content: string
  from: string | null
  createdAt: string
}

export default function HomePage() {
  const emojis = ['🌟', '💌', '📜', '🧡', '🌈', '✉️']
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

  const content = {
    title: 'Lời nhắn hôm nay',
    loading: 'Đang tải lời nhắn...',
    noMessage: 'Bạn chưa có lời nhắn nào hôm nay!',
    today: new Date().toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }

  const [message, setMessage] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMessage() {
      try {
        const res = await fetch('/api/message/get')
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Lỗi không xác định')

        setMessage(data.message)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Đã xảy ra lỗi không xác định')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMessage()
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {randomEmoji} {content.title}
      </h1>
      <p className={styles.date}>{content.today}</p>

      <div className={styles.content}>
        {loading && <p className={styles.loading}>{content.loading}</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !message && (
          <p className={styles.noMessage}>{content.noMessage}</p>
        )}
        {message && <MessageCard message={message} />}
      </div>
    </div>
  )
}
