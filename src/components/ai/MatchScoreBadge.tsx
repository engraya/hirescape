'use client'

import { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { useMatchScore } from '@/hooks/useAI'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

interface MatchScoreBadgeProps {
  jobId: string
  size?: 'sm' | 'lg'
}

export default function MatchScoreBadge({ jobId, size = 'sm' }: MatchScoreBadgeProps) {
  const { user } = useAuthStore()
  const [expanded, setExpanded] = useState(false)
  const hasSkills = (user?.skills?.length ?? 0) > 0

  const { data, isPending, isError } = useMatchScore(jobId, !!user && hasSkills)

  if (!user || !hasSkills) return null

  if (isPending) {
    return <Skeleton className={cn('rounded-full', size === 'lg' ? 'h-8 w-24' : 'h-6 w-16')} />
  }

  if (isError || !data) return null

  const score = data.score
  const colorClass =
    score >= 75
      ? 'bg-green-100 text-green-700 border-green-200'
      : score >= 50
      ? 'bg-amber-100 text-amber-700 border-amber-200'
      : 'bg-slate-100 text-slate-600 border-slate-200'

  return (
    <div className="space-y-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border font-semibold transition-all',
          size === 'lg' ? 'px-4 py-1.5 text-base' : 'px-2.5 py-0.5 text-xs',
          colorClass
        )}
      >
        <Sparkles className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3')} />
        {score}% Match
        {expanded ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </button>

      {expanded && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-sm shadow-md space-y-3 max-w-xs">
          <p className="text-slate-700">{data.summary}</p>
          {data.strengths?.length > 0 && (
            <div>
              <p className="font-semibold text-green-700 mb-1">Strengths</p>
              <ul className="space-y-0.5">
                {data.strengths.map((s) => (
                  <li key={s} className="text-slate-600 flex gap-1.5">
                    <span className="text-green-500">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.gaps?.length > 0 && (
            <div>
              <p className="font-semibold text-red-600 mb-1">Gaps</p>
              <ul className="space-y-0.5">
                {data.gaps.map((g) => (
                  <li key={g} className="text-slate-600 flex gap-1.5">
                    <span className="text-red-400">✗</span> {g}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
