'use client'

import Link from 'next/link'
import { TrendingUp, Sparkles, Loader2, Lightbulb, Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useMarketInsights } from '@/hooks/useAI'
import { useJobs } from '@/hooks/useJobs'
import { formatDate } from '@/lib/utils'

export default function InsightsPage() {
  const { data: insights, isPending: insightsPending, isError } = useMarketInsights()
  const { data: allJobs, isPending: jobsLoading } = useJobs()

  const trendingJobs = (allJobs ?? [])
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-indigo-600" />
          Market Insights
        </h1>
        <p className="text-slate-500 mt-1">AI-powered trends and intelligence for the job market</p>
      </div>

      {/* AI Insights */}
      <Card className="border border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            AI Market Intelligence
          </CardTitle>
          <span className="text-xs text-slate-400">Updated weekly</span>
        </CardHeader>
        <CardContent>
          {insightsPending ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <p className="text-sm text-slate-500">AI insights are unavailable right now.</p>
          ) : insights?.insights?.length ? (
            <div className="space-y-3">
              {insights.insights.map((insight, i) => (
                <div key={i} className="flex gap-3 p-3 bg-purple-50 rounded-xl">
                  <div className="p-1.5 bg-purple-100 rounded-lg shrink-0 self-start">
                    <Lightbulb className="h-4 w-4 text-purple-600" />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No insights available.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Skills */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-base">Top In-Demand Skills</CardTitle>
          </CardHeader>
          <CardContent>
            {insightsPending ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 flex-1 rounded-full" />
                  </div>
                ))}
              </div>
            ) : insights?.topSkills?.length ? (
              <div className="space-y-3">
                {insights.topSkills.slice(0, 8).map((skill, i) => (
                  <div key={skill} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-4">{i + 1}</span>
                    <span className="text-sm font-medium text-slate-800 w-28 shrink-0">{skill}</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${Math.max(20, 100 - i * 10)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No skill data available.</p>
            )}
          </CardContent>
        </Card>

        {/* Top Industries */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-base">Top Industries Hiring</CardTitle>
          </CardHeader>
          <CardContent>
            {insightsPending ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 flex-1 rounded-full" />
                  </div>
                ))}
              </div>
            ) : insights?.topIndustries?.length ? (
              <div className="space-y-3">
                {insights.topIndustries.slice(0, 8).map((industry, i) => (
                  <div key={industry} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-4">{i + 1}</span>
                    <span className="text-sm font-medium text-slate-800 w-28 shrink-0 truncate">{industry}</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${Math.max(20, 100 - i * 10)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No industry data available.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Trending jobs */}
      <Card className="border border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-indigo-600" />
            Trending Jobs
          </CardTitle>
          <Link href="/jobs">
            <button className="text-xs text-indigo-600 hover:underline">View all</button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {jobsLoading ? (
            <div className="space-y-3 px-6 pb-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {trendingJobs.map((job) => (
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
                  <span className="text-xs text-slate-400 shrink-0">{formatDate(job.createdAt)}</span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
