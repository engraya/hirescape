'use client'

import { motion } from 'framer-motion'

const stats = [
  { label: 'Jobs Listed', value: '10,000+' },
  { label: 'Companies', value: '500+' },
  { label: 'AI Matches Made', value: '50,000+' },
  { label: 'Hired via HireIQ', value: '2,500+' },
]

export default function Stats() {
  return (
    <section className="bg-indigo-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-indigo-200 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
