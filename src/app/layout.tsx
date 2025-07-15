import './globals.css'
import styles from '../styles/layout.module.css'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const { locale } = params
  return {
    title: locale === 'vi' ? 'Đăng ký · One Kind Word' : 'Register · One Kind Word',
    description:
      locale === 'vi'
        ? 'Lan tỏa năng lượng tích cực từ những lời nhắn tử tế.'
        : 'Spread positive energy through kind messages.',
  }
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params
  if (!['vi', 'en'].includes(locale)) notFound()

  return (
    <html lang={locale}>
      <body className={styles.body}>
        <div className={styles.wrapper}>
          {/* Header đơn giản */}
          <header className={styles.minimalHeader}>
            <h1 className={styles.logo}>One Kind Word</h1>
            <p className={styles.tagline}>
              {locale === 'vi'
                ? 'Mỗi ngày một lời tử tế 💛'
                : 'A kind word every day 💛'}
            </p>
          </header>

          {/* Main content */}
          <main className={styles.main}>{children}</main>

          {/* Footer */}
          <footer className={styles.footer}>
            <p>
              {locale === 'vi'
                ? '“Sự tử tế là ngôn ngữ mà người điếc có thể nghe và người mù có thể thấy.”'
                : '“Kindness is the language which the deaf can hear and the blind can see.”'}
            </p>
            <small>© {new Date().getFullYear()} One Kind Word</small>
          </footer>
        </div>
      </body>
    </html>
  )
}
