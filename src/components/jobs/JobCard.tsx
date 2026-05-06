'use client'

import Link from 'next/link'
import { MapPin, Clock, Building2, Calendar, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import MatchScoreBadge from '@/components/ai/MatchScoreBadge'
import { useApplyJob } from '@/hooks/useJobs'
import { useAuthStore } from '@/store/authStore'
import { formatDate, getInitials, cn } from '@/lib/utils'
import type { Job } from '@/types'

interface JobCardProps {
  job: Job
  isApplied?: boolean
}

const jobTypeBadge: Record<string, string> = {
  'full-time': 'bg-green-100 text-green-700',
  'part-time': 'bg-blue-100 text-blue-700',
  contract: 'bg-amber-100 text-amber-700',
  internship: 'bg-purple-100 text-purple-700',
}

const levelBadge: Record<string, string> = {
  junior: 'bg-slate-100 text-slate-700',
  mid: 'bg-indigo-100 text-indigo-700',
  senior: 'bg-orange-100 text-orange-700',
}

export default function JobCard({ job, isApplied = false }: JobCardProps) {
  const { user } = useAuthStore()
  const applyMutation = useApplyJob()

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    applyMutation.mutate(job._id)
  }

  const creatorId =
    typeof job.createdBy === 'object' && job.createdBy !== null
      ? job.createdBy._id
      : job.createdBy
  const isOwner = user?._id === creatorId

  return (
    <Card className="bg-white hover:shadow-md transition-all duration-200 border border-slate-200 rounded-xl overflow-hidden group">
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-lg font-bold shrink-0">
              {getInitials(job.company)}
            </div>
            <div>
              <Link
                href={`/jobs/${job._id}`}
                className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1 group-hover:text-indigo-600"
              >
                {job.title}
              </Link>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                <Building2 className="h-3.5 w-3.5" />
                {job.company}
              </p>
            </div>
          </div>
          <MatchScoreBadge jobId={job._id} size="sm" />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5" /> {job.salary}
          </span>
          {job.applicationDeadline && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Due {formatDate(job.applicationDeadline)}
            </span>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', jobTypeBadge[job.jobType] ?? 'bg-slate-100 text-slate-700')}>
            {job.jobType}
          </span>
          <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', levelBadge[job.experienceLevel] ?? 'bg-slate-100 text-slate-700')}>
            {job.experienceLevel}
          </span>
          {job.industry && (
            <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
              {job.industry}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Link href={`/jobs/${job._id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          {!isOwner && user && (
            isApplied ? (
              <Badge className="bg-green-100 text-green-700 border-green-200 flex items-center px-3">
                Applied
              </Badge>
            ) : (
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={handleApply}
                disabled={applyMutation.isPending}
              >
                {applyMutation.isPending ? 'Applying...' : 'Apply'}
              </Button>
            )
          )}
        </div>
      </div>
    </Card>
  )
}
