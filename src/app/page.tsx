'use client'

import { useRouter } from 'next/navigation'
import styles from '@/styles/intro.module.css'

export default function IntroPage() {
  const router = useRouter()

  const content = {
    title: 'One Kind Word 💛',
    subtitle: 'Nơi bạn có thể gửi và nhận những lời nhắn tích cực, tử tế, và ẩn danh – giúp lan tỏa năng lượng yêu thương mỗi ngày.',
    description:'Dù bạn đang mệt mỏi, căng thẳng, hay chỉ muốn mỉm cười, One Kind Word sẽ luôn là nơi bạn có thể tìm thấy một lời nhắn nhẹ nhàng từ ai đó – ở đâu đó trên thế giới này 🌍',
    button: 'Tham gia ngay'
  }

  return (
    <div className={styles.introWrapper}>
      <h1 className={styles.title}>{content.title}</h1>
      <p className={styles.subtitle}>{content.subtitle}</p>
      <p className={styles.description}>{content.description}</p>

      <button
        className={styles.joinButton}
        onClick={() => router.push(`/register`)}
      >
        {content.button}
      </button>
    </div>
  )
}
