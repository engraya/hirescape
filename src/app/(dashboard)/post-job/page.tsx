'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Sparkles, Loader2, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SalaryEstimator from '@/components/ai/SalaryEstimator'
import { postJobSchema, type PostJobFormData } from '@/lib/validations'
import { useCreateJob } from '@/hooks/useJobs'
import { useGenerateJD } from '@/hooks/useAI'

function PostJobContent() {
  const router = useRouter()
  const createJobMutation = useCreateJob()
  const generateJDMutation = useGenerateJD()

  const [responsibilities, setResponsibilities] = useState('')
  const [jdTone, setJdTone] = useState('professional')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostJobFormData>({
    resolver: zodResolver(postJobSchema),
    defaultValues: { jobType: 'full-time', experienceLevel: 'mid' },
  })

  const titleVal = watch('title')
  const levelVal = watch('experienceLevel')
  const industryVal = watch('industry')
  const locationVal = watch('location')

  const onSubmit = (data: PostJobFormData) => {
    createJobMutation.mutate(data, {
      onSuccess: () => router.push('/my-jobs'),
    })
  }

  const handleGenerateJD = () => {
    if (!titleVal) return
    generateJDMutation.mutate(
      {
        title: titleVal,
        seniority: levelVal,
        responsibilities: responsibilities.split('\n').filter(Boolean),
        tone: jdTone,
      },
      {
        onSuccess: (data) => {
          setValue('description', data.description, { shouldValidate: true })
          if (data.requirements) {
            setValue('requirements', data.requirements.join('\n'))
          }
        },
      }
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <PlusCircle className="h-6 w-6 text-indigo-600" />
          Post a Job
        </h1>
        <p className="text-slate-500 mt-1">Create a listing with AI-powered job description generation</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-5">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Job Title *</Label>
                    <Input placeholder="e.g. Senior Frontend Engineer" {...register('title')} />
                    {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Company *</Label>
                    <Input placeholder="Company name" {...register('company')} />
                    {errors.company && <p className="text-xs text-red-500">{errors.company.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Salary Range *</Label>
                    <Input placeholder="e.g. $80,000 - $120,000" {...register('salary')} />
                    <SalaryEstimator
                      title={titleVal ?? ''}
                      location={locationVal ?? ''}
                      experienceLevel={levelVal}
                      industry={industryVal ?? ''}
                      onSelect={(range) => setValue('salary', range, { shouldValidate: true })}
                    />
                    {errors.salary && <p className="text-xs text-red-500">{errors.salary.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>Location *</Label>
                    <Input placeholder="e.g. Remote, New York" {...register('location')} />
                    {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label>Job Type *</Label>
                    <Select
                      defaultValue="full-time"
                      onValueChange={(v) => setValue('jobType', v as PostJobFormData['jobType'])}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Level *</Label>
                    <Select
                      defaultValue="mid"
                      onValueChange={(v) => setValue('experienceLevel', v as PostJobFormData['experienceLevel'])}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="mid">Mid-level</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Industry *</Label>
                    <Input placeholder="e.g. Technology" {...register('industry')} />
                    {errors.industry && <p className="text-xs text-red-500">{errors.industry.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Application Deadline *</Label>
                  <Input type="date" {...register('applicationDeadline')} />
                  {errors.applicationDeadline && (
                    <p className="text-xs text-red-500">{errors.applicationDeadline.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">Job Description *</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  rows={10}
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">{errors.description.message}</p>
                )}

                <div className="space-y-1.5">
                  <Label>Requirements (one per line)</Label>
                  <Textarea
                    placeholder="5+ years of experience with React&#10;Strong TypeScript skills&#10;Experience with REST APIs"
                    rows={4}
                    {...register('requirements')}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={createJobMutation.isPending}
                className="bg-indigo-600 hover:bg-indigo-700 gap-2 px-8"
              >
                {createJobMutation.isPending ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Posting...</>
                ) : (
                  <><PlusCircle className="h-4 w-4" />Post Job</>
                )}
              </Button>
            </div>
          </div>

          {/* AI sidebar */}
          <div className="space-y-4">
            <Card className="border border-purple-200 bg-purple-50 sticky top-6">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-purple-800">
                  <Sparkles className="h-4 w-4" />
                  Generate with AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-purple-700 text-sm">Key responsibilities (one per line)</Label>
                  <Textarea
                    placeholder="Build scalable React applications&#10;Lead code reviews&#10;Collaborate with design team"
                    rows={5}
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    className="bg-white text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-purple-700 text-sm">Tone</Label>
                  <Select value={jdTone} onValueChange={setJdTone}>
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="startup">Startup Energy</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <Button
                  type="button"
                  onClick={handleGenerateJD}
                  disabled={generateJDMutation.isPending || !titleVal}
                  className="w-full bg-purple-600 hover:bg-purple-700 gap-2"
                >
                  {generateJDMutation.isPending ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Generating...</>
                  ) : (
                    <><Sparkles className="h-4 w-4" />Generate Job Description</>
                  )}
                </Button>

                {!titleVal && (
                  <p className="text-xs text-purple-600 text-center">
                    Fill in the job title first
                  </p>
                )}

                {generateJDMutation.isPending && (
                  <p className="text-xs text-purple-600 text-center animate-pulse">
                    Gemini is writing your job description...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

export default function PostJobPage() {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 bg-slate-100 rounded-xl" />}>
      <PostJobContent />
    </Suspense>
  )
}
