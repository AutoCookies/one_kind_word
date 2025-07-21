// app/layout.tsx
import './globals.css'
import styles from '@/styles/layout.module.css'

export const metadata = {
  title: 'One Kind Word',
  description: 'Mỗi ngày một lời tử tế 💛',
}

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="vi">
      <body className={styles.body}>
        <div className={styles.wrapper}>
          <header className={styles.minimalHeader}>
            <h1 className={styles.logo}>One Kind Word</h1>
            <p className={styles.tagline}>
              &apos;Mỗi ngày một lời tử tế 💛&apos;
            </p>
          </header>

          <main className={styles.main}>{children}</main>

          <footer className={styles.footer}>
            <p>
              &quot;Sự tử tế là ngôn ngữ mà người điếc có thể nghe và người mù có thể thấy.&quot;
            </p>
            <small>© {new Date().getFullYear()} One Kind Word</small>
          </footer>
        </div>
      </body>
    </html>
  )
}
