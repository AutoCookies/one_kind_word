'use client'

import styles from '@/styles/vi/home/page.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import MessageCard from '@/components/MessageCard'

interface Message {
  id: number
  content: string
  from: string | null
  createdAt: string
}

export default function HomePage() {
  const params = useParams()
  const locale = params?.locale as string
  const isVietnamese = locale === 'vi'

  const emojis = ['🌟', '💌', '📜', '🧡', '🌈', '✉️']
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

  const content = {
    title: isVietnamese ? 'Lời nhắn hôm nay' : 'Message of the Day',
    loading: isVietnamese ? 'Đang tải lời nhắn...' : 'Loading message...',
    noMessage: isVietnamese
      ? 'Bạn chưa có lời nhắn nào hôm nay!'
      : 'No message for today!',
    today: new Date().toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
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
      } catch (err: any) {
        setError(err.message)
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
        {!loading && !message && <p className={styles.noMessage}>{content.noMessage}</p>}
        {message && <MessageCard message={message} />}
      </div>
    </div>
  )
}
