'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, BriefcaseBusiness, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { useAuth } from '@/hooks/useAuth'
import { cn, getInitials } from '@/lib/utils'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuthStore()
  const { logout } = useAuth()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/jobs', label: 'Jobs' },
    ...(isAuthenticated ? [{ href: '/dashboard', label: 'Dashboard' }] : []),
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <BriefcaseBusiness className="h-7 w-7 text-indigo-600" />
            <span className="text-xl font-bold text-indigo-600">HireIQ</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-indigo-600',
                  pathname === link.href ? 'text-indigo-600' : 'text-slate-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                  {getInitials(user.firstName, user.lastName)}
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="gap-1">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-slate-700 hover:text-indigo-600"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={() => { logout(); setOpen(false) }}
              className="flex items-center gap-2 text-sm text-red-600"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/register" onClick={() => setOpen(false)}>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
