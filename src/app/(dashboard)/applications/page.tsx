'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FileText, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { TableRowSkeleton } from '@/components/shared/LoadingSkeleton'
import MatchScoreBadge from '@/components/ai/MatchScoreBadge'
import InterviewPrepCard from '@/components/ai/InterviewPrepCard'
import { useAppliedJobs, useDeleteAppliedJob } from '@/hooks/useJobs'
import { formatDate } from '@/lib/utils'
import type { Job } from '@/types'

export default function ApplicationsPage() {
  const { data: appliedJobs, isPending } = useAppliedJobs()
  const deleteMutation = useDeleteAppliedJob()
  const [withdrawTarget, setWithdrawTarget] = useState<Job | null>(null)

  const confirmWithdraw = () => {
    if (!withdrawTarget) return
    deleteMutation.mutate(withdrawTarget._id, { onSuccess: () => setWithdrawTarget(null) })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <FileText className="h-6 w-6 text-indigo-600" />
          My Applications
        </h1>
        <p className="text-slate-500 mt-1">
          Jobs you&apos;ve applied to — {appliedJobs?.length ?? 0} total
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Job</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Type</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Deadline</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">AI Match</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isPending && Array.from({ length: 4 }).map((_, i) => (
              <TableRowSkeleton key={i} cols={5} />
            ))}

            {!isPending && (!appliedJobs || appliedJobs.length === 0) && (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center text-slate-500">
                  <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-medium">No applications yet</p>
                  <p className="text-xs mt-1 mb-4">Browse jobs and start applying</p>
                  <Link href="/jobs">
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Browse Jobs</Button>
                  </Link>
                </td>
              </tr>
            )}

            {!isPending && appliedJobs?.map((job) => (
              <tr key={job._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <Link href={`/jobs/${job._id}`} className="font-medium text-slate-900 hover:text-indigo-600">
                      {job.title}
                    </Link>
                    <p className="text-xs text-slate-500">{job.company} · {job.location}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className="text-xs">{job.jobType}</Badge>
                </td>
                <td className="px-4 py-3 text-slate-600 text-xs">
                  {job.applicationDeadline ? formatDate(job.applicationDeadline) : '—'}
                </td>
                <td className="px-4 py-3">
                  <MatchScoreBadge jobId={job._id} size="sm" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <InterviewPrepCard
                      jobId={job._id}
                      jobTitle={job.title}
                      trigger={
                        <Button size="sm" variant="ghost" className="h-8 text-xs gap-1 text-indigo-600">
                          Interview Prep
                        </Button>
                      }
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setWithdrawTarget(job)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Withdraw confirmation */}
      <AlertDialog open={!!withdrawTarget} onOpenChange={(open) => !open && setWithdrawTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Withdraw application?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to withdraw your application for &quot;{withdrawTarget?.title}&quot; at {withdrawTarget?.company}? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmWithdraw}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Withdraw'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
