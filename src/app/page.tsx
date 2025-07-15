'use client'

import { useRouter } from 'next/navigation'
import styles from '../styles/intro.module.css'

export default function IntroPage() {
  const router = useRouter()

  return (
    <div className={styles.introWrapper}>
      <h1 className={styles.title}>One Kind Word 💛</h1>
      <p className={styles.subtitle}>
        Nơi bạn có thể gửi và nhận những lời nhắn tích cực, tử tế, và ẩn danh –
        giúp lan tỏa năng lượng yêu thương mỗi ngày.
      </p>

      <p className={styles.description}>
        Dù bạn đang mệt mỏi, căng thẳng, hay chỉ muốn mỉm cười, One Kind Word sẽ luôn là nơi bạn có thể tìm thấy một lời nhắn nhẹ nhàng từ ai đó – ở đâu đó trên thế giới này 🌍
      </p>

      <button className={styles.joinButton} onClick={() => router.push('./register')}>
        Tham gia ngay
      </button>
    </div>
  )
}
