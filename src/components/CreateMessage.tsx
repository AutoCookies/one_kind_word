'use client'

import styles from '@/styles/components/CreateMessage.module.css'
import { useState } from 'react'

type TextProps = {
  title: string
  description: string
  button: string
  from?: string
  sendToFuture?: string
}

type CreateMessageProps = {
  text: TextProps
  onClose?: () => void // Optional callback
}

export default function CreateMessage({ text, onClose }: CreateMessageProps) {
  const [content, setContent] = useState('')
  const [from, setFrom] = useState('')
  const [toFuture, setToFuture] = useState(false)
  const [sendAt, setSendAt] = useState<Date | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = {
      content,
      from,
      toFuture,
      sendAt: toFuture ? sendAt : null,
    }

    try {
      const response = await fetch('/api/message/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        alert('Message created successfully!')
        setContent('')
        setFrom('')
        setToFuture(false)
        setSendAt(null)
        onClose?.() // Ẩn form nếu cần
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error('Error creating message:', error)
      alert('An error occurred while creating the message.')
    }
  }

  return (
    <div className={styles.container}>
      {onClose && (
        <button onClick={onClose} className={styles.closeButton}>
          ×
        </button>
      )}
      <h2 className={styles.title}>{text.title}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="content">{text.description}</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="from">{text.from || 'From'}:</label>
          <input
            type="text"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>
            <input
              type="checkbox"
              checked={toFuture}
              onChange={(e) => setToFuture(e.target.checked)}
            />
            {text.sendToFuture}
          </label>
        </div>
        {toFuture && (
          <div className={styles.formGroup}>
            <label htmlFor="sendAt">Send At:</label>
            <input
              type="datetime-local"
              id="sendAt"
              value={sendAt ? sendAt.toISOString().slice(0, 16) : ''}
              onChange={(e) => setSendAt(new Date(e.target.value))}
              required
            />
          </div>
        )}
        <button type="submit" className={styles.submitButton}>
          {text.button}
        </button>
      </form>
    </div>
  )
}
