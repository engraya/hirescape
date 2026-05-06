'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

export default function JobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/jobs?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearAll = () => router.push('/jobs')

  const hasFilters =
    searchParams.has('type') ||
    searchParams.has('level') ||
    searchParams.has('industry') ||
    searchParams.has('location')

  return (
    <aside className="w-64 shrink-0 space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Filters</h3>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" /> Clear all
            </button>
          )}
        </div>

        <Separator />

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Job Type</Label>
          <Select
            value={searchParams.get('type') ?? 'all'}
            onValueChange={(v) => updateFilter('type', v)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Experience Level</Label>
          <Select
            value={searchParams.get('level') ?? 'all'}
            onValueChange={(v) => updateFilter('level', v)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="mid">Mid-level</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Industry</Label>
          <Input
            placeholder="e.g. Technology"
            defaultValue={searchParams.get('industry') ?? ''}
            className="h-9 text-sm"
            onBlur={(e) => updateFilter('industry', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateFilter('industry', e.currentTarget.value)
            }}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Location</Label>
          <Input
            placeholder="e.g. Remote"
            defaultValue={searchParams.get('location') ?? ''}
            className="h-9 text-sm"
            onBlur={(e) => updateFilter('location', e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateFilter('location', e.currentTarget.value)
            }}
          />
        </div>
      </div>
    </aside>
  )
}
