'use client'

import { useRouter } from 'next/navigation'
import styles from '../styles/language-select.module.css'

export default function Home() {
  const router = useRouter()

  const handleSelect = (locale: string) => {
    router.push(`/${locale}`)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select your language / Chọn ngôn ngữ</h1>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => handleSelect('vi')}>Tiếng Việt</button>
        <button className={styles.button} onClick={() => handleSelect('en')}>English</button>
      </div>
    </div>
  )
}
