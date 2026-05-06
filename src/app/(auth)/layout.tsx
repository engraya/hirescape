import Navbar from '@/components/shared/Navbar'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
        {children}
      </main>
    </>
  )
}
