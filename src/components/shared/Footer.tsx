import Link from 'next/link'
import { BriefcaseBusiness } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BriefcaseBusiness className="h-6 w-6 text-indigo-400" />
              <span className="text-lg font-bold text-white">HireIQ</span>
            </div>
            <p className="text-sm">
              AI-powered job matching that finds the perfect fit — for candidates and employers alike.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
              <li><Link href="/post-job" className="hover:text-white transition-colors">Post a Job</Link></li>
              <li><Link href="/insights" className="hover:text-white transition-colors">Market Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Register</Link></li>
              <li><Link href="/profile" className="hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-center">
          © {new Date().getFullYear()} HireIQ. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
