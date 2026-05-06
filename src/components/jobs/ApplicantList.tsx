'use client'

import { Sparkles, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useScreenApplicants } from '@/hooks/useAI'
import type { ApplicantResult } from '@/types'

interface ApplicantListProps {
  jobId: string
  applicantCount: number
}

const tierConfig = {
  strong: { label: 'Strong Fit', className: 'bg-green-100 text-green-700 border-green-200' },
  potential: { label: 'Potential Fit', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  weak: { label: 'Weak Fit', className: 'bg-slate-100 text-slate-600 border-slate-200' },
}

export default function ApplicantList({ jobId, applicantCount }: ApplicantListProps) {
  const mutation = useScreenApplicants()

  const handleScreen = () => mutation.mutate(jobId)

  const results = mutation.data as ApplicantResult[] | undefined

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {applicantCount} applicant{applicantCount !== 1 ? 's' : ''} total
        </p>
        {!results && (
          <Button
            onClick={handleScreen}
            disabled={mutation.isPending}
            className="bg-indigo-600 hover:bg-indigo-700 gap-2"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Screening...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Screen with AI
              </>
            )}
          </Button>
        )}
      </div>

      {mutation.isPending && (
        <div className="space-y-2 py-4">
          <p className="text-sm text-slate-600 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
            Gemini is ranking your applicants...
          </p>
          <Progress value={undefined} className="h-2 animate-pulse" />
        </div>
      )}

      {mutation.isError && (
        <p className="text-sm text-red-600">Something went wrong. Try again.</p>
      )}

      {results && results.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Ranked by AI fit score</span>
            <Button size="sm" variant="ghost" onClick={handleScreen} className="h-7 text-xs gap-1">
              <Sparkles className="h-3 w-3" /> Re-screen
            </Button>
          </div>

          {results.map((r) => {
            const tier = tierConfig[r.fitTier] ?? tierConfig.weak
            return (
              <div
                key={r.userId}
                className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-sm shrink-0">
                  {r.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-slate-900">{r.name}</span>
                    <span className="text-sm text-slate-500">{r.email}</span>
                    <Badge className={tier.className}>{tier.label}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{r.summary}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {results && results.length === 0 && (
        <p className="text-sm text-slate-500 py-4 text-center">No applicants to screen yet.</p>
      )}
    </div>
  )
}
