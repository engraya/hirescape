export interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  verified: boolean
  isAdmin: boolean
  skills: string[]
  experienceSummary: string
  currentTitle: string
  education: string
  resumeUrl?: string
  location?: string
  createdJobs: string[]
  appliedJobs: string[]
  createdAt: string
}

export interface Job {
  _id: string
  title: string
  company: string
  salary: string
  location: string
  description: string
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship'
  experienceLevel: 'junior' | 'mid' | 'senior'
  industry: string
  applicationDeadline: string
  requirements: string[]
  createdBy: string | { _id: string; email: string; firstName?: string; lastName?: string }
  applicants: string[] | { _id: string; email: string }[]
  createdAt: string
}

export interface MatchScore {
  score: number
  strengths: string[]
  gaps: string[]
  summary: string
}

export interface SkillGap {
  matched: string[]
  missing: string[]
  suggestions: { skill: string; resource: string }[]
}

export interface InterviewQuestion {
  category: string
  question: string
  tip: string
}

export interface ApplicantResult {
  userId: string
  name: string
  email: string
  fitTier: 'strong' | 'potential' | 'weak'
  summary: string
}

export interface CoverLetter {
  content: string
}

export interface SalaryEstimate {
  min: number
  max: number
  median?: number
  currency: string
  rationale?: string
}

export interface MarketInsights {
  insights: string[]
  topSkills: string[]
  topIndustries: string[]
}

export interface AuthResponse {
  success: boolean
  token?: string
  user: User
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}
