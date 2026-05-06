'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/axios'
import type { MatchScore, SkillGap, InterviewQuestion, ApplicantResult, CoverLetter, SalaryEstimate, MarketInsights } from '@/types'

export function useMatchScore(jobId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['ai', 'match-score', jobId],
    queryFn: () =>
      api.post<MatchScore>('/ai/match-score', { jobId }).then((r) => r.data),
    enabled: enabled && !!jobId,
    staleTime: 1000 * 60 * 10,
    retry: false,
  })
}

export function useGenerateCoverLetter() {
  return useMutation({
    mutationFn: (data: { jobId: string; tone?: string }) =>
      api.post<CoverLetter>('/ai/cover-letter', data).then((r) => r.data),
    onError: () => toast.error('Something went wrong generating your cover letter. Try again.'),
  })
}

export function useSkillGap(jobId: string, enabled = true) {
  return useQuery({
    queryKey: ['ai', 'skill-gap', jobId],
    queryFn: () =>
      api.get<SkillGap>(`/ai/skill-gap/${jobId}`).then((r) => r.data),
    enabled: enabled && !!jobId,
    staleTime: 1000 * 60 * 10,
    retry: false,
  })
}

export function useInterviewPrep(jobId: string, enabled = true) {
  return useQuery({
    queryKey: ['ai', 'interview-prep', jobId],
    queryFn: () =>
      api.get<InterviewQuestion[]>(`/ai/interview-prep/${jobId}`).then((r) => r.data),
    enabled: enabled && !!jobId,
    staleTime: 1000 * 60 * 10,
    retry: false,
  })
}

export function useGenerateJD() {
  return useMutation({
    mutationFn: (data: { title: string; seniority: string; responsibilities: string[]; tone: string }) =>
      api.post<{ description: string; requirements?: string[] }>('/ai/generate-jd', data).then((r) => r.data),
    onError: () => toast.error('Something went wrong generating the job description. Try again.'),
  })
}

export function useSalaryEstimate(
  params: { title: string; location: string; experienceLevel: string; industry: string },
  enabled: boolean
) {
  return useQuery({
    queryKey: ['ai', 'salary', params.title, params.location, params.experienceLevel],
    queryFn: () =>
      api.post<SalaryEstimate>('/ai/salary-estimate', params).then((r) => r.data),
    enabled: enabled && !!params.title,
    staleTime: 1000 * 60 * 30,
    retry: false,
  })
}

export function useScreenApplicants() {
  return useMutation({
    mutationFn: (jobId: string) =>
      api.post<ApplicantResult[]>(`/ai/screen-applicants/${jobId}`).then((r) => r.data),
    onError: () => toast.error('Something went wrong screening applicants. Try again.'),
  })
}

export function useMarketInsights() {
  return useQuery({
    queryKey: ['ai', 'insights'],
    queryFn: () =>
      api.get<MarketInsights>('/ai/insights').then((r) => r.data),
    staleTime: 1000 * 60 * 60,
    retry: false,
  })
}

export function useSemanticSearch() {
  return useMutation({
    mutationFn: (q: string) =>
      api.get<{ jobs: import('@/types').Job[] }>(`/ai/semantic-search?q=${encodeURIComponent(q)}`).then((r) => r.data.jobs ?? []),
    onError: () => toast.error('Something went wrong with AI search. Try again.'),
  })
}

export function useParseResume() {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData()
      formData.append('resume', file)
      return api.post<Partial<import('@/types').User>>('/ai/parse-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((r) => r.data)
    },
    onError: () => toast.error('Something went wrong parsing your resume. Try again.'),
  })
}
