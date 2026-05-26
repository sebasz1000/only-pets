import Navbar from '@/components/shared/Navbar'
import { ReactNode, Suspense } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={null} >
        <Navbar />
      </Suspense>
      <main>{children}</main>
    </div>
  )
}