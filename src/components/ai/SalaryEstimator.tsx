'use client'

import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSalaryEstimate } from '@/hooks/useAI'

interface SalaryEstimatorProps {
  title: string
  location?: string
  experienceLevel?: string
  industry?: string
  onSelect?: (range: string) => void
}

export default function SalaryEstimator({
  title,
  location = '',
  experienceLevel = 'mid',
  industry = '',
  onSelect,
}: SalaryEstimatorProps) {
  const [enabled, setEnabled] = useState(false)

  const { data, isPending, isError } = useSalaryEstimate(
    { title, location, experienceLevel, industry },
    enabled && !!title
  )

  if (!title) return null

  return (
    <div className="mt-1.5">
      {!enabled ? (
        <button
          type="button"
          onClick={() => setEnabled(true)}
          className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
        >
          <Sparkles className="h-3 w-3" />
          Suggest salary range
        </button>
      ) : isPending ? (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Loader2 className="h-3 w-3 animate-spin" />
          Fetching salary data...
        </div>
      ) : isError ? (
        <p className="text-xs text-red-500">Could not estimate salary.</p>
      ) : data ? (
        <div className="flex items-center gap-3 p-2.5 bg-indigo-50 rounded-lg border border-indigo-100">
          <Sparkles className="h-4 w-4 text-indigo-500 shrink-0" />
          <div className="flex-1">
            <span className="text-xs text-slate-500">AI Suggested: </span>
            <span className="text-sm font-semibold text-indigo-700">
              ${data.min.toLocaleString()} — ${data.max.toLocaleString()}{' '}
              <span className="font-normal text-slate-500">/ year</span>
            </span>
          </div>
          {onSelect && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() => onSelect(`$${data.min.toLocaleString()} - $${data.max.toLocaleString()}`)}
            >
              Use
            </Button>
          )}
        </div>
      ) : null}
    </div>
  )
}
