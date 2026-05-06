'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  MapPin, DollarSign, Calendar, Briefcase, Building2,
  Users, Clock, CheckCircle2, Loader2, ArrowLeft, Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DetailSkeleton } from '@/components/shared/LoadingSkeleton'
import MatchScoreBadge from '@/components/ai/MatchScoreBadge'
import CoverLetterModal from '@/components/ai/CoverLetterModal'
import SkillGapPanel from '@/components/ai/SkillGapPanel'
import InterviewPrepCard from '@/components/ai/InterviewPrepCard'
import ApplicantList from '@/components/jobs/ApplicantList'
import { useJob, useApplyJob, useDeleteCreatedJob, useAppliedJobs } from '@/hooks/useJobs'
import { useAuthStore } from '@/store/authStore'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { user } = useAuthStore()
  const { data: job, isPending, isError } = useJob(id)
  const { data: appliedJobs } = useAppliedJobs()
  const applyMutation = useApplyJob()
  const deleteMutation = useDeleteCreatedJob()

  if (isPending) return <div className="max-w-5xl mx-auto"><DetailSkeleton /></div>
  if (isError || !job) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Job not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  const creatorId = typeof job.createdBy === 'object' && job.createdBy !== null
    ? job.createdBy._id
    : job.createdBy
  const isOwner = user?._id === creatorId
  const isApplied = appliedJobs?.some((j) => j._id === job._id) ?? false
  const applicantCount = Array.isArray(job.applicants) ? job.applicants.length : 0

  const handleApply = () => applyMutation.mutate(job._id)
  const handleDelete = () => {
    deleteMutation.mutate(job._id, {
      onSuccess: () => { toast.success('Job deleted'); router.push('/my-jobs') },
    })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1.5 -ml-2">
        <ArrowLeft className="h-4 w-4" /> Back to jobs
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
                {job.company?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
                <p className="text-slate-600 flex items-center gap-1.5 mt-1">
                  <Building2 className="h-4 w-4" /> {job.company}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-slate-400" />{job.location}</span>
              <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4 text-slate-400" />{job.salary}</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-slate-400" />{applicantCount} applicants</span>
              {job.applicationDeadline && (
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-slate-400" />Deadline: {formatDate(job.applicationDeadline)}</span>
              )}
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-slate-400" />Posted {formatDate(job.createdAt)}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{job.jobType}</Badge>
              <Badge variant="outline">{job.experienceLevel}</Badge>
              {job.industry && <Badge variant="outline">{job.industry}</Badge>}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Job Description</h2>
            <div className="prose prose-slate prose-sm max-w-none">
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
            </div>
          </div>

          {/* Requirements */}
          {job.requirements?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex gap-2 text-slate-700 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI panels for job seekers */}
          {!isOwner && user && (
            <SkillGapPanel jobId={job._id} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 sticky top-6">
            {/* Match score */}
            {user && !isOwner && (
              <div className="flex flex-col items-center gap-1 py-3 border-b border-slate-100">
                <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Your Match</p>
                <MatchScoreBadge jobId={job._id} size="lg" />
              </div>
            )}

            {isOwner ? (
              // Creator actions
              <div className="space-y-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2">
                      <Users className="h-4 w-4" />
                      View Applicants ({applicantCount})
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Applicants — {job.title}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <ApplicantList jobId={job._id} applicantCount={applicantCount} />
                    </div>
                  </SheetContent>
                </Sheet>

                <Button variant="outline" className="w-full gap-2" onClick={() => router.push(`/post-job?edit=${job._id}`)}>
                  Edit Job
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full gap-2 text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                      Delete Job
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this job?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete &quot;{job.title}&quot; and all its applications. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : 'Delete'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              // Seeker actions
              <div className="space-y-3">
                {isApplied ? (
                  <div className="w-full py-2.5 px-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Applied
                  </div>
                ) : (
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    onClick={handleApply}
                    disabled={applyMutation.isPending}
                  >
                    {applyMutation.isPending ? (
                      <><Loader2 className="h-4 w-4 animate-spin mr-2" />Applying...</>
                    ) : 'Apply Now'}
                  </Button>
                )}

                {user && (
                  <>
                    <CoverLetterModal jobId={job._id} jobTitle={job.title} />
                    <InterviewPrepCard
                      jobId={job._id}
                      jobTitle={job.title}
                      trigger={
                        <Button variant="outline" className="w-full gap-2">
                          Interview Prep
                        </Button>
                      }
                    />
                  </>
                )}
              </div>
            )}

            <Separator />

            <div className="text-xs text-slate-500 space-y-1.5">
              <p>Posted by {
                typeof job.createdBy === 'object' && job.createdBy !== null
                  ? job.createdBy.email
                  : 'employer'
              }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
