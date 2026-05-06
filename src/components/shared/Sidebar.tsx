'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  FileText,
  User,
  TrendingUp,
  LogOut,
  BriefcaseBusiness,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/jobs', label: 'Search Jobs', icon: Search },
  { href: '/post-job', label: 'Post a Job', icon: PlusCircle },
  { href: '/my-jobs', label: 'My Jobs', icon: Briefcase },
  { href: '/applications', label: 'Applications', icon: FileText },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/insights', label: 'Market Insights', icon: TrendingUp },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 h-16 border-b border-slate-200">
        <BriefcaseBusiness className="h-7 w-7 text-indigo-600" />
        <span className="text-xl font-bold text-indigo-600">HireIQ</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Icon className={cn('h-5 w-5', active ? 'text-indigo-600' : 'text-slate-400')} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
