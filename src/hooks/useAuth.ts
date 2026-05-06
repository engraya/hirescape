'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { useAuthStore } from '@/store/authStore'
import type { LoginFormData, RegisterFormData } from '@/lib/validations'
import type { AuthResponse } from '@/types'

export function useAuth() {
  const router = useRouter()
  const { user, isAuthenticated, setUser, logout: clearUser } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) =>
      api.post<AuthResponse>('/auth/login', data).then((r) => r.data),
    onSuccess: (data) => {
      setUser(data.user, data.token)
      toast.success('Welcome back!')
      router.push('/jobs')
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message ?? err.message
          : 'Login failed. Please try again.'
      toast.error(message)
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) =>
      api.post('/auth/register', data).then((r) => r.data),
    onSuccess: () => {
      toast.success('Account created! Please log in.')
      router.push('/login')
    },
    onError: (err: unknown) => {
      const message =
        err instanceof Error
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message ?? err.message
          : 'Registration failed. Please try again.'
      toast.error(message)
    },
  })

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (_) {}
    clearUser()
    router.push('/')
    toast.success('Logged out')
  }

  return { user, isAuthenticated, loginMutation, registerMutation, logout }
}
