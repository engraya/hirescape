'use client'

import Link from 'next/link'
import { Briefcase, FileText, PlusCircle, TrendingUp, Users, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useJobs, useCreatedJobs, useAppliedJobs } from '@/hooks/useJobs'
import { useAuthStore } from '@/store/authStore'
import { formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { data: allJobs, isPending: jobsLoading } = useJobs()
  const { data: createdJobs, isPending: createdLoading } = useCreatedJobs()
  const { data: appliedJobs, isPending: appliedLoading } = useAppliedJobs()

  const stats = [
    {
      label: 'Jobs Available',
      value: allJobs?.length ?? 0,
      icon: Briefcase,
      color: 'text-indigo-600 bg-indigo-100',
      loading: jobsLoading,
    },
    {
      label: 'Jobs Posted',
      value: createdJobs?.length ?? 0,
      icon: PlusCircle,
      color: 'text-green-600 bg-green-100',
      loading: createdLoading,
    },
    {
      label: 'Applications',
      value: appliedJobs?.length ?? 0,
      icon: FileText,
      color: 'text-amber-600 bg-amber-100',
      loading: appliedLoading,
    },
    {
      label: 'Total Applicants',
      value: createdJobs?.reduce((sum, j) => sum + (Array.isArray(j.applicants) ? j.applicants.length : 0), 0) ?? 0,
      icon: Users,
      color: 'text-purple-600 bg-purple-100',
      loading: createdLoading,
    },
  ]

  const recentJobs = (allJobs ?? []).slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {user?.firstName} 👋
        </h1>
        <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening on your dashboard</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border border-slate-200">
            <CardContent className="pt-5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  {stat.loading ? (
                    <Skeleton className="h-7 w-12 mb-1" />
                  ) : (
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  )}
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/jobs">
          <Card className="border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="pt-5 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100">
                <Briefcase className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-indigo-600">Browse Jobs</p>
                <p className="text-xs text-slate-500">Find your perfect role</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/post-job">
          <Card className="border border-slate-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="pt-5 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-100">
                <PlusCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-green-600">Post a Job</p>
                <p className="text-xs text-slate-500">Find great candidates</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/insights">
          <Card className="border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="pt-5 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-purple-600">Market Insights</p>
                <p className="text-xs text-slate-500">See market trends</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent jobs */}
      <Card className="border border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">Recent Jobs</CardTitle>
          <Link href="/jobs">
            <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
              View all
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {jobsLoading ? (
            <div className="space-y-3 px-6 pb-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentJobs.length === 0 ? (
            <p className="text-sm text-slate-500 px-6 pb-6">No jobs yet.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentJobs.map((job) => (
                <Link
                  key={job._id}
                  href={`/jobs/${job._id}`}
                  className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-sm shrink-0">
                    {job.company?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{job.title}</p>
                    <p className="text-xs text-slate-500">{job.company} · {job.location}</p>
                  </div>
                  <div className="text-xs text-slate-400 shrink-0">{formatDate(job.createdAt)}</div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile completeness */}
      {user && (!user.skills?.length || !user.experienceSummary) && (
        <Card className="border border-amber-200 bg-amber-50">
          <CardContent className="pt-5 flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-amber-100">
              <Sparkles className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-amber-900">Complete your profile to unlock AI features</p>
              <p className="text-sm text-amber-700 mt-0.5">Add your skills and experience summary to get AI match scores and cover letters.</p>
            </div>
            <Link href="/profile">
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700 shrink-0">
                Update Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
