'use client'

import { useState } from 'react'
import { Sparkles, Copy, RotateCcw, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useGenerateCoverLetter } from '@/hooks/useAI'
import { toast } from 'sonner'

interface CoverLetterModalProps {
  jobId: string
  jobTitle?: string
}

export default function CoverLetterModal({ jobId, jobTitle }: CoverLetterModalProps) {
  const [tone, setTone] = useState('professional')
  const [content, setContent] = useState('')
  const mutation = useGenerateCoverLetter()

  const generate = () => {
    mutation.mutate(
      { jobId, tone },
      {
        onSuccess: (data) => setContent(data.content ?? ''),
      }
    )
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    toast.success('Copied to clipboard!')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          Cover Letter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Cover Letter
            {jobTitle && <span className="text-slate-500 font-normal text-base">for {jobTitle}</span>}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-slate-700">Tone</label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                <SelectItem value="confident">Confident</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={generate}
              disabled={mutation.isPending}
              className="bg-indigo-600 hover:bg-indigo-700 gap-2"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating
                  <span className="animate-pulse">...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>

          {mutation.isPending && !content && (
            <div className="flex items-center gap-3 p-6 bg-purple-50 rounded-xl">
              <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
              <p className="text-purple-700 font-medium">
                Gemini is writing your cover letter
                <span className="animate-pulse">...</span>
              </p>
            </div>
          )}

          {content && (
            <div className="space-y-3">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-80 text-sm leading-relaxed"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={generate} className="gap-1">
                  <RotateCcw className="h-4 w-4" />
                  Regenerate
                </Button>
                <Button size="sm" onClick={copyToClipboard} className="gap-1 bg-indigo-600 hover:bg-indigo-700">
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
