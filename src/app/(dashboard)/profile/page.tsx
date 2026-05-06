'use client'

import { useQuery } from '@tanstack/react-query'
import { User, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import ProfileForm from '@/components/profile/ProfileForm'
import ResumeUploader from '@/components/ai/ResumeUploader'
import SalaryEstimator from '@/components/ai/SalaryEstimator'
import api from '@/lib/axios'
import { useAuthStore } from '@/store/authStore'
import type { User as UserType } from '@/types'

export default function ProfilePage() {
  const { user, setUser } = useAuthStore()

  const { data: profile, isPending } = useQuery({
    queryKey: ['user-profile', user?._id],
    queryFn: () =>
      api.get<{ user: UserType }>(`/auth/users/${user!._id}`).then((r) => r.data.user),
    enabled: !!user?._id,
  })

  const currentUser = profile ?? user

  if (isPending || !currentUser) {
    return (
      <div className="space-y-6 max-w-4xl">
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>
      </div>
    )
  }

  const skills = currentUser.skills ?? []
  const completeness = [
    !!currentUser.currentTitle,
    skills.length > 0,
    !!currentUser.experienceSummary,
    !!currentUser.education,
  ]
  const completePct = Math.round((completeness.filter(Boolean).length / completeness.length) * 100)

  const handleParsedResume = (parsed: Partial<UserType>) => {
    const merged: UserType = {
      ...currentUser,
      ...parsed,
    }
    setUser(merged)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <User className="h-6 w-6 text-indigo-600" />
          My Profile
        </h1>
        <p className="text-slate-500 mt-1">Manage your profile to unlock AI-powered job matching</p>
      </div>

      {/* Profile completeness */}
      <Card className="border border-slate-200">
        <CardContent className="pt-5 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">Profile completeness</span>
            <span className="font-semibold text-indigo-600">{completePct}%</span>
          </div>
          <Progress value={completePct} className="h-2" />
          {completePct < 100 && (
            <p className="text-xs text-slate-500">
              Complete your profile to unlock AI match scores, cover letters, and skill gap analysis.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile form */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm user={currentUser} />
          </CardContent>
        </Card>

        {/* Resume upload */}
        <div className="space-y-4">
          <Card className="border border-slate-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Resume AI Parser
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">
                Upload your resume and let AI automatically fill in your profile information.
              </p>
              <ResumeUploader onParsed={handleParsedResume} />
            </CardContent>
          </Card>

          {/* Market value */}
          <Card className="border border-slate-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Market Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-3">
                Estimate your market salary range based on your current role and location.
              </p>
              <SalaryEstimator
                title={currentUser.currentTitle ?? ''}
                location={currentUser.location ?? ''}
                experienceLevel="mid"
                industry=""
              />
            </CardContent>
          </Card>

          {/* Skills display */}
          {skills.length > 0 && (
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-base">Your Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
