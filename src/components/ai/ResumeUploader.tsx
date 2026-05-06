'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, Loader2, CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParseResume } from '@/hooks/useAI'
import { toast } from 'sonner'
import type { User } from '@/types'

interface ResumeUploaderProps {
  onParsed?: (data: Partial<User>) => void
}

export default function ResumeUploader({ onParsed }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<Partial<User> | null>(null)
  const parseMutation = useParseResume()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0]
    if (f) {
      if (f.size > 5 * 1024 * 1024) {
        toast.error('File too large. Max 5MB.')
        return
      }
      setFile(f)
      setPreview(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  })

  const handleUpload = () => {
    if (!file) return
    parseMutation.mutate(file, {
      onSuccess: (data) => {
        setPreview(data)
        toast.success('Resume parsed successfully!')
      },
    })
  }

  const handleConfirm = () => {
    if (preview && onParsed) {
      onParsed(preview)
      setFile(null)
      setPreview(null)
      toast.success('Profile auto-filled from resume!')
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-indigo-400 bg-indigo-50'
            : 'border-slate-300 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <Upload className="h-8 w-8 text-indigo-500" />
          </div>
          {isDragActive ? (
            <p className="text-indigo-600 font-medium">Drop your resume here</p>
          ) : (
            <>
              <p className="font-medium text-slate-700">Drop your resume here</p>
              <p className="text-sm text-slate-500">or click to browse (PDF, max 5MB)</p>
            </>
          )}
        </div>
      </div>

      {file && !preview && (
        <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg">
          <FileText className="h-5 w-5 text-indigo-500 shrink-0" />
          <span className="text-sm text-slate-700 flex-1 truncate">{file.name}</span>
          <Button
            size="sm"
            onClick={handleUpload}
            disabled={parseMutation.isPending}
            className="bg-indigo-600 hover:bg-indigo-700 gap-1.5"
          >
            {parseMutation.isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Reading...
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5" />
                Upload & Parse
              </>
            )}
          </Button>
          <button onClick={() => setFile(null)} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {parseMutation.isPending && (
        <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
          <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
          <p className="text-purple-700 font-medium text-sm">
            Gemini is reading your resume<span className="animate-pulse">...</span>
          </p>
        </div>
      )}

      {preview && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <p className="font-semibold text-green-800">Resume parsed! Review extracted data:</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {preview.currentTitle && (
              <div>
                <span className="text-slate-500">Title:</span>{' '}
                <span className="font-medium">{preview.currentTitle}</span>
              </div>
            )}
            {preview.education && (
              <div>
                <span className="text-slate-500">Education:</span>{' '}
                <span className="font-medium">{preview.education}</span>
              </div>
            )}
            {preview.skills && preview.skills.length > 0 && (
              <div className="col-span-2">
                <span className="text-slate-500">Skills:</span>{' '}
                <span className="font-medium">{preview.skills.slice(0, 8).join(', ')}</span>
                {preview.skills.length > 8 && (
                  <span className="text-slate-400"> +{preview.skills.length - 8} more</span>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleConfirm} className="bg-green-600 hover:bg-green-700 gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Apply to Profile
            </Button>
            <Button size="sm" variant="outline" onClick={() => setPreview(null)}>
              Discard
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
