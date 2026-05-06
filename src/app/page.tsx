import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Stats from '@/components/landing/Stats'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
      </main>
      <Footer />
    </>
  )
}
