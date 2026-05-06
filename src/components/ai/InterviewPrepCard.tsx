'use client'

import { useState } from 'react'
import { Sparkles, ChevronLeft, ChevronRight, Lightbulb, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useInterviewPrep } from '@/hooks/useAI'

interface InterviewPrepCardProps {
  jobId: string
  jobTitle?: string
  trigger?: React.ReactNode
}

const categoryColors: Record<string, string> = {
  Technical: 'bg-blue-100 text-blue-700',
  Behavioral: 'bg-purple-100 text-purple-700',
  Situational: 'bg-amber-100 text-amber-700',
}

export default function InterviewPrepCard({ jobId, jobTitle, trigger }: InterviewPrepCardProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [showTip, setShowTip] = useState(false)

  const { data, isPending, isError } = useInterviewPrep(jobId, open)

  const current = data?.[index]
  const total = data?.length ?? 0

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); setIndex(0); setShowTip(false) }}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Interview Prep
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Interview Prep
            {jobTitle && <span className="text-slate-500 font-normal text-sm">— {jobTitle}</span>}
          </DialogTitle>
        </DialogHeader>

        {isPending && (
          <div className="flex items-center gap-3 py-8 justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
            <p className="text-slate-600">Generating questions<span className="animate-pulse">...</span></p>
          </div>
        )}

        {isError && (
          <p className="text-center text-red-500 py-6 text-sm">Something went wrong. Try again.</p>
        )}

        {current && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <Badge className={categoryColors[current.category] ?? 'bg-slate-100 text-slate-700'}>
                {current.category}
              </Badge>
              <span>{index + 1} / {total}</span>
            </div>

            {/* Question card */}
            <div
              className="min-h-32 bg-slate-50 rounded-xl p-5 cursor-pointer select-none border border-slate-200 hover:border-indigo-300 transition-colors"
              onClick={() => setShowTip(!showTip)}
            >
              {showTip ? (
                <div className="flex gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm leading-relaxed">{current.tip}</p>
                </div>
              ) : (
                <p className="text-slate-900 font-medium leading-relaxed">{current.question}</p>
              )}
            </div>
            <p className="text-xs text-slate-400 text-center">
              {showTip ? 'Click to see the question' : 'Click to reveal a tip'}
            </p>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setIndex(Math.max(0, index - 1)); setShowTip(false) }}
                disabled={index === 0}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setIndex(Math.min(total - 1, index + 1)); setShowTip(false) }}
                disabled={index === total - 1}
                className="gap-1"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
