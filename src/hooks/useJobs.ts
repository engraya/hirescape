'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/axios'
import type { Job } from '@/types'
import type { PostJobFormData } from '@/lib/validations'

export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters: Record<string, string>) => [...jobKeys.lists(), filters] as const,
  detail: (id: string) => [...jobKeys.all, 'detail', id] as const,
  created: () => [...jobKeys.all, 'created'] as const,
  applied: () => [...jobKeys.all, 'applied'] as const,
}

export function useJobs(filters?: Record<string, string>) {
  return useQuery({
    queryKey: jobKeys.list(filters ?? {}),
    queryFn: () =>
      api.get<{ jobs: Job[]; success: boolean }>('/jobs', { params: filters }).then((r) => r.data.jobs ?? []),
  })
}

export function useJob(id: string) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () =>
      api.get<{ job: Job; success: boolean }>(`/jobs/${id}`).then((r) => r.data.job),
    enabled: !!id,
  })
}

export function useCreatedJobs() {
  return useQuery({
    queryKey: jobKeys.created(),
    queryFn: () =>
      api.get<{ jobs: Job[]; success: boolean }>('/jobs/user/created').then((r) => r.data.jobs ?? []),
  })
}

export function useAppliedJobs() {
  return useQuery({
    queryKey: jobKeys.applied(),
    queryFn: () =>
      api.get<{ jobs: Job[]; success: boolean }>('/jobs/user/applied').then((r) => r.data.jobs ?? []),
  })
}

export function useApplyJob() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (jobId: string) => api.post(`/jobs/apply/${jobId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: jobKeys.applied() })
      qc.invalidateQueries({ queryKey: jobKeys.lists() })
      toast.success('Application submitted!')
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } }).response?.data?.message ??
        'Application failed'
      toast.error(message)
    },
  })
}

export function useDeleteAppliedJob() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (jobId: string) => api.delete(`/jobs/applied/${jobId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: jobKeys.applied() })
      toast.success('Application withdrawn')
    },
    onError: () => toast.error('Failed to withdraw application'),
  })
}

export function useDeleteCreatedJob() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (jobId: string) => api.delete(`/jobs/created/${jobId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: jobKeys.created() })
      toast.success('Job deleted')
    },
    onError: () => toast.error('Failed to delete job'),
  })
}

export function useCreateJob() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: PostJobFormData) =>
      api.post<{ job: Job; success: boolean }>('/jobs', {
        ...data,
        requirements: data.requirements
          ? data.requirements.split('\n').filter(Boolean)
          : [],
      }).then((r) => r.data.job),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: jobKeys.created() })
      qc.invalidateQueries({ queryKey: jobKeys.lists() })
      toast.success('Job posted successfully!')
    },
    onError: (err: unknown) => {
      const message =
        (err as { response?: { data?: { message?: string } } }).response?.data?.message ??
        'Failed to create job'
      toast.error(message)
    },
  })
}

export function useUpdateJob() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PostJobFormData> }) =>
      api.put<{ job: Job }>(`/jobs/${id}`, data).then((r) => r.data.job),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: jobKeys.detail(id) })
      qc.invalidateQueries({ queryKey: jobKeys.created() })
      toast.success('Job updated successfully!')
    },
    onError: () => toast.error('Failed to update job'),
  })
}
