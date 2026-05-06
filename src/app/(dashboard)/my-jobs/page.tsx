'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Briefcase, Trash2, Users, Pencil, Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { TableRowSkeleton } from '@/components/shared/LoadingSkeleton'
import ApplicantList from '@/components/jobs/ApplicantList'
import { useCreatedJobs, useDeleteCreatedJob } from '@/hooks/useJobs'
import { formatDate } from '@/lib/utils'
import type { Job } from '@/types'

export default function MyJobsPage() {
  const { data: jobs, isPending } = useCreatedJobs()
  const deleteMutation = useDeleteCreatedJob()
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null)
  const [applicantJob, setApplicantJob] = useState<Job | null>(null)

  const confirmDelete = () => {
    if (!deleteTarget) return
    deleteMutation.mutate(deleteTarget._id, { onSuccess: () => setDeleteTarget(null) })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-indigo-600" />
            My Posted Jobs
          </h1>
          <p className="text-slate-500 mt-1">Jobs you&apos;ve posted as a recruiter</p>
        </div>
        <Link href="/post-job">
          <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
            <Plus className="h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Job Title</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Type</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Applicants</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Deadline</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Posted</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isPending && Array.from({ length: 4 }).map((_, i) => (
              <TableRowSkeleton key={i} cols={6} />
            ))}

            {!isPending && (!jobs || jobs.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center text-slate-500">
                  <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="font-medium">No jobs posted yet</p>
                  <p className="text-xs mt-1">Post your first job to start receiving applications</p>
                </td>
              </tr>
            )}

            {!isPending && jobs?.map((job) => {
              const applicantCount = Array.isArray(job.applicants) ? job.applicants.length : 0
              return (
                <tr key={job._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <Link href={`/jobs/${job._id}`} className="font-medium text-slate-900 hover:text-indigo-600">
                        {job.title}
                      </Link>
                      <p className="text-xs text-slate-500">{job.company}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">{job.jobType}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setApplicantJob(job)}
                      className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      <Users className="h-4 w-4" />
                      {applicantCount}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {job.applicationDeadline ? formatDate(job.applicationDeadline) : '—'}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {formatDate(job.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setApplicantJob(job)}
                        className="h-8 gap-1.5 text-indigo-600"
                      >
                        <Users className="h-3.5 w-3.5" />
                        Applicants
                      </Button>
                      <Link href={`/post-job?edit=${job._id}`}>
                        <Button size="sm" variant="ghost" className="h-8">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => setDeleteTarget(job)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete &quot;{deleteTarget?.title}&quot;?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this job and all its applications. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Applicant screener sheet */}
      <Sheet open={!!applicantJob} onOpenChange={(open) => !open && setApplicantJob(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Applicants — {applicantJob?.title}</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            {applicantJob && (
              <ApplicantList
                jobId={applicantJob._id}
                applicantCount={Array.isArray(applicantJob.applicants) ? applicantJob.applicants.length : 0}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
