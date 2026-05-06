'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import SalaryEstimator from '@/components/ai/SalaryEstimator'
import { profileSchema, type ProfileFormData } from '@/lib/validations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/types'

interface ProfileFormProps {
  user: User
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const { setUser } = useAuthStore()
  const qc = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      currentTitle: user.currentTitle ?? '',
      experienceSummary: user.experienceSummary ?? '',
      education: user.education ?? '',
      skills: user.skills?.join(', ') ?? '',
      location: user.location ?? '',
    },
  })

  useEffect(() => {
    reset({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      currentTitle: user.currentTitle ?? '',
      experienceSummary: user.experienceSummary ?? '',
      education: user.education ?? '',
      skills: user.skills?.join(', ') ?? '',
      location: user.location ?? '',
    })
  }, [user, reset])

  const updateMutation = useMutation({
    mutationFn: (data: ProfileFormData) =>
      api.put<{ user: User }>(`/auth/users/${user._id}`, {
        ...data,
        skills: data.skills
          ? data.skills.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      }).then((r) => r.data.user),
    onSuccess: (updatedUser) => {
      setUser(updatedUser)
      qc.invalidateQueries({ queryKey: ['user-profile', user._id] })
      toast.success('Profile updated!')
    },
    onError: () => toast.error('Failed to update profile'),
  })

  const onSubmit = (data: ProfileFormData) => updateMutation.mutate(data)

  const currentTitle = watch('currentTitle')
  const location = watch('location')

  // Allow external parsed resume data to populate form
  ;(ProfileForm as { fillFromParsed?: (data: Partial<User>) => void }).fillFromParsed = (data: Partial<User>) => {
    if (data.firstName) setValue('firstName', data.firstName)
    if (data.lastName) setValue('lastName', data.lastName)
    if (data.currentTitle) setValue('currentTitle', data.currentTitle)
    if (data.experienceSummary) setValue('experienceSummary', data.experienceSummary)
    if (data.education) setValue('education', data.education)
    if (data.skills) setValue('skills', data.skills.join(', '))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>First Name</Label>
          <Input {...register('firstName')} />
          {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Last Name</Label>
          <Input {...register('lastName')} />
          {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Email</Label>
        <Input value={user.email} disabled className="bg-slate-50" />
      </div>

      <div className="space-y-1.5">
        <Label>Current Title</Label>
        <Input placeholder="e.g. Senior Software Engineer" {...register('currentTitle')} />
        <SalaryEstimator
          title={currentTitle ?? ''}
          location={location ?? ''}
          experienceLevel="mid"
          industry=""
        />
      </div>

      <div className="space-y-1.5">
        <Label>Location</Label>
        <Input placeholder="e.g. New York, NY or Remote" {...register('location')} />
      </div>

      <div className="space-y-1.5">
        <Label>Skills</Label>
        <Input
          placeholder="e.g. React, TypeScript, Node.js, Python"
          {...register('skills')}
        />
        <p className="text-xs text-slate-500">Comma-separated list</p>
      </div>

      <div className="space-y-1.5">
        <Label>Experience Summary</Label>
        <Textarea
          placeholder="Brief summary of your professional background and key achievements..."
          rows={4}
          {...register('experienceSummary')}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Education</Label>
        <Input placeholder="e.g. B.S. Computer Science, MIT" {...register('education')} />
      </div>

      <Button
        type="submit"
        disabled={updateMutation.isPending || !isDirty}
        className="bg-indigo-600 hover:bg-indigo-700 gap-2"
      >
        {updateMutation.isPending ? (
          <><Loader2 className="h-4 w-4 animate-spin" />Saving...</>
        ) : (
          <><Save className="h-4 w-4" />Save Profile</>
        )}
      </Button>
    </form>
  )
}
