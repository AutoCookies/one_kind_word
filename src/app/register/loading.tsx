// src/app/[locale]/loading.tsx
'use client'

import styles from '@/styles/loading.module.css'

export default function LocaleLoading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>Đang tải...</p>
    </div>
  )
}
