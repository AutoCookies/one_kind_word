// src/app/page.tsx
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/vi') // hoặc '/en' nếu bạn muốn mặc định là tiếng Anh
}
