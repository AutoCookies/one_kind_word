'use client'

import { useRouter, useParams } from 'next/navigation'
import styles from '../../styles/vi/intro.module.css'

export default function IntroPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params?.locale as string

  const isVietnamese = locale === 'vi'

  const content = {
    title: 'One Kind Word 💛',
    subtitle: isVietnamese
      ? 'Nơi bạn có thể gửi và nhận những lời nhắn tích cực, tử tế, và ẩn danh – giúp lan tỏa năng lượng yêu thương mỗi ngày.'
      : 'Where you can send and receive kind, anonymous messages – spreading love and positivity every day.',

    description: isVietnamese
      ? 'Dù bạn đang mệt mỏi, căng thẳng, hay chỉ muốn mỉm cười, One Kind Word sẽ luôn là nơi bạn có thể tìm thấy một lời nhắn nhẹ nhàng từ ai đó – ở đâu đó trên thế giới này 🌍'
      : 'Whether you’re tired, stressed, or just need a smile, One Kind Word is where you’ll find a gentle message from someone — somewhere in the world 🌍',

    button: isVietnamese ? 'Tham gia ngay' : 'Join Now',
  }

  return (
    <div className={styles.introWrapper}>
      <h1 className={styles.title}>{content.title}</h1>
      <p className={styles.subtitle}>{content.subtitle}</p>
      <p className={styles.description}>{content.description}</p>

      <button
        className={styles.joinButton}
        onClick={() => router.push(`/${locale}/register`)}
      >
        {content.button}
      </button>
    </div>
  )
}
