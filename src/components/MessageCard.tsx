// src/components/MessageCard.tsx
import styles from '@/styles/components/MessageCard.module.css'

interface Message {
  id: number
  content: string
  from: string | null
  createdAt: string
}

interface MessageCardProps {
  message: Message
}

export default function MessageCard({ message }: MessageCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.content}>{message.content}</p>
      {message.from && <p>- {message.from}</p>}
    </div>
  )
}
