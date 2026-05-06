import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'At least 8 characters required'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const postJobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  salary: z.string().min(1, 'Salary is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  jobType: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  experienceLevel: z.enum(['junior', 'mid', 'senior']),
  industry: z.string().min(1, 'Industry is required'),
  applicationDeadline: z.string().min(1, 'Deadline is required'),
  requirements: z.string().optional(),
})

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  currentTitle: z.string().optional(),
  experienceSummary: z.string().optional(),
  education: z.string().optional(),
  skills: z.string().optional(),
  location: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type PostJobFormData = z.infer<typeof postJobSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
