import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import styles from '../../styles/vi/layout.module.css'; // Giữ nguyên import styles

type Props = {
  children: ReactNode;
  params: { locale: 'vi' | 'en' };
};

// Layout component
export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  if (!['vi', 'en'].includes(locale)) {
    notFound();
  }

  return (
    <div className={styles.body}>
      <div className={styles.wrapper}>
        <header className={styles.minimalHeader}>
          <h1 className={styles.logo}>One Kind Word</h1>
          <p className={styles.tagline}>
            {locale === 'vi'
              ? 'Mỗi ngày một lời tử tế 💛'
              : 'A kind word every day 💛'}
          </p>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <p>
            {locale === 'vi'
              ? '“Sự tử tế là ngôn ngữ mà người điếc có thể nghe và người mù có thể thấy.”'
              : '“Kindness is the language which the deaf can hear and the blind can see.”'}
          </p>
          <small>© {new Date().getFullYear()} One Kind Word</small>
        </footer>
      </div>
    </div>
  );
}

// Generate static params for SSG
export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }];
}
