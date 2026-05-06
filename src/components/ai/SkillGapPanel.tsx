'use client'

import { useState } from 'react'
import { Sparkles, ChevronDown, ChevronUp, CheckCircle2, XCircle, Loader2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSkillGap } from '@/hooks/useAI'

interface SkillGapPanelProps {
  jobId: string
}

export default function SkillGapPanel({ jobId }: SkillGapPanelProps) {
  const [open, setOpen] = useState(false)
  const { data, isPending, isError, refetch } = useSkillGap(jobId, open)

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2 font-medium text-slate-800">
          <Sparkles className="h-4 w-4 text-purple-500" />
          Skill Gap Analysis
        </div>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {open && (
        <div className="border-t border-slate-200 bg-white p-4 space-y-4">
          {isPending && (
            <div className="flex items-center gap-3 py-4">
              <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
              <p className="text-sm text-slate-600">Analyzing your skills against job requirements...</p>
            </div>
          )}

          {isError && (
            <div className="flex items-center gap-3 py-2">
              <p className="text-sm text-red-600">Something went wrong.</p>
              <Button size="sm" variant="outline" onClick={() => refetch()}>Retry</Button>
            </div>
          )}

          {data && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Matched Skills ({data.matched?.length ?? 0})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.matched?.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-green-50 text-green-700 border border-green-200"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {skill}
                      </span>
                    ))}
                    {!data.matched?.length && (
                      <p className="text-xs text-slate-500">No matched skills found</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-1.5">
                    <XCircle className="h-4 w-4" />
                    Missing Skills ({data.missing?.length ?? 0})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.missing?.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-red-50 text-red-600 border border-red-200"
                      >
                        <XCircle className="h-3 w-3" />
                        {skill}
                      </span>
                    ))}
                    {!data.missing?.length && (
                      <p className="text-xs text-slate-500 italic">No missing skills — great fit!</p>
                    )}
                  </div>
                </div>
              </div>

              {data.suggestions?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Learning Resources</h4>
                  <ul className="space-y-1.5">
                    {data.suggestions.map((s) => (
                      <li key={s.skill} className="flex items-center gap-2 text-sm">
                        <span className="text-slate-800 font-medium">{s.skill}</span>
                        <span className="text-slate-400">→</span>
                        <a
                          href={s.resource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline flex items-center gap-1"
                        >
                          Learn it <ExternalLink className="h-3 w-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
