'use client'

import { motion } from 'framer-motion'
import { Sparkles, Search, FileText, TrendingUp, Brain, Award } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Match Scoring',
    description:
      'Get an instant compatibility score for every job. Our AI analyzes your skills, experience, and the job requirements to give you a precise match percentage.',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: Search,
    title: 'Semantic Job Search',
    description:
      'Search with natural language, not just keywords. Find "remote Python jobs at startups" or "senior design roles with good work-life balance" — our AI understands context.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: FileText,
    title: 'AI Cover Letter Writer',
    description:
      'Generate a personalized, compelling cover letter in seconds. Tailored to the specific job, your background, and the tone you choose — professional, casual, or enthusiastic.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Sparkles,
    title: 'Resume AI Parser',
    description:
      'Drop your resume and watch your profile auto-fill. Our AI extracts your skills, experience, and education instantly so you spend less time on paperwork.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: TrendingUp,
    title: 'Skill Gap Analysis',
    description:
      'See exactly what skills you have vs. what a job needs. Get personalized learning recommendations to close gaps and improve your match score.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Award,
    title: 'Interview Prep',
    description:
      'AI-generated interview questions tailored to the specific job — technical, behavioral, and situational. Practice until you\'re ready to nail it.',
    color: 'bg-rose-100 text-rose-600',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Everything you need to land your dream job
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From first click to offer letter — HireIQ has AI-powered tools for every step of your job search.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="bg-slate-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${f.color}`}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
