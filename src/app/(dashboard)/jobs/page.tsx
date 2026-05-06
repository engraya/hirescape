'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Sparkles, Loader2, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import JobCard from '@/components/jobs/JobCard'
import JobFilters from '@/components/jobs/JobFilters'
import { JobCardSkeleton } from '@/components/shared/LoadingSkeleton'
import { useJobs, useAppliedJobs } from '@/hooks/useJobs'
import { useSemanticSearch } from '@/hooks/useAI'
import { useAuthStore } from '@/store/authStore'
import type { Job } from '@/types'

function JobsContent() {
  const searchParams = useSearchParams()
  const { user } = useAuthStore()
  const [aiMode, setAiMode] = useState(false)
  const [aiQuery, setAiQuery] = useState('')
  const [textSearch, setTextSearch] = useState('')

  const { data: allJobs, isPending: jobsLoading } = useJobs()
  const { data: appliedJobs } = useAppliedJobs()
  const semanticMutation = useSemanticSearch()

  const appliedIds = new Set((appliedJobs ?? []).map((j) => j._id))

  const filteredJobs = useMemo(() => {
    if (!allJobs) return []
    let jobs = [...allJobs]

    const type = searchParams.get('type')
    const level = searchParams.get('level')
    const industry = searchParams.get('industry')
    const location = searchParams.get('location')

    if (type && type !== 'all') jobs = jobs.filter((j) => j.jobType === type)
    if (level && level !== 'all') jobs = jobs.filter((j) => j.experienceLevel === level)
    if (industry) jobs = jobs.filter((j) => j.industry?.toLowerCase().includes(industry.toLowerCase()))
    if (location) jobs = jobs.filter((j) => j.location?.toLowerCase().includes(location.toLowerCase()))
    if (textSearch) {
      const q = textSearch.toLowerCase()
      jobs = jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q)
      )
    }

    return jobs
  }, [allJobs, searchParams, textSearch])

  const displayJobs: Job[] = aiMode && semanticMutation.data ? semanticMutation.data : filteredJobs

  const handleAiSearch = () => {
    if (!aiQuery.trim()) return
    semanticMutation.mutate(aiQuery)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Browse Jobs</h1>
        <p className="text-slate-500 mt-1">
          {displayJobs.length} job{displayJobs.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-2">
          {!aiMode ? (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search jobs, companies, keywords..."
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          ) : (
            <div className="relative flex-1">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-500" />
              <Input
                placeholder="Try: &quot;remote senior React developer&quot; or &quot;startup marketing role&quot;"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                className="pl-9"
              />
            </div>
          )}

          {aiMode && (
            <Button
              onClick={handleAiSearch}
              disabled={semanticMutation.isPending}
              className="bg-indigo-600 hover:bg-indigo-700 gap-2"
            >
              {semanticMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Search
            </Button>
          )}

          <Button
            variant={aiMode ? 'default' : 'outline'}
            className={aiMode ? 'bg-purple-600 hover:bg-purple-700 gap-1.5' : 'gap-1.5'}
            onClick={() => {
              setAiMode(!aiMode)
              setAiQuery('')
              semanticMutation.reset()
            }}
          >
            <Sparkles className="h-4 w-4" />
            {aiMode ? (
              <>
                <X className="h-3.5 w-3.5" /> Exit AI
              </>
            ) : (
              'AI Search'
            )}
          </Button>
        </div>

        {aiMode && (
          <p className="text-xs text-purple-600 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            AI semantic search — describe what you&apos;re looking for in plain language
          </p>
        )}
      </div>

      <div className="flex gap-6">
        <JobFilters />

        <div className="flex-1 min-w-0">
          {jobsLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!jobsLoading && displayJobs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">No jobs found</h3>
              <p className="text-slate-500 text-sm">
                Try searching for &quot;remote developer&quot; or &quot;product manager&quot;
              </p>
            </div>
          )}

          {!jobsLoading && displayJobs.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {displayJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isApplied={appliedIds.has(job._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}</div>}>
      <JobsContent />
    </Suspense>
  )
}
