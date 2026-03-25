import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassButton from '@/components/ui/GlassButton'
import { projects, categories } from '@/data/projects'

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="relative bg-brand-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Portafolio"
          title="Proyectos"
          subtitle="Clientes que hicieron realidad su visión con nosotros"
        />

        {/* Filter bar */}
        <div className="flex flex-wrap gap-3 mb-16">
          {categories.map((cat) => (
            <GlassButton
              key={cat.value}
              variant={activeFilter === cat.value ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveFilter(cat.value)}
            >
              {cat.label}
            </GlassButton>
          ))}
        </div>

        {/* Project Grid - Editorial Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((project, i) => {
              // Editorial pattern: alternate 7/5, 5/7, full-12
              const pattern = i % 5
              let colSpan = 'lg:col-span-7'
              let aspectRatio = 'aspect-[16/10]'

              if (pattern === 1 || pattern === 2) {
                colSpan = pattern === 1 ? 'lg:col-span-5' : 'lg:col-span-7'
                aspectRatio = pattern === 1 ? 'aspect-[4/5]' : 'aspect-[16/10]'
              } else if (pattern === 3) {
                colSpan = 'lg:col-span-5'
                aspectRatio = 'aspect-[4/5]'
              } else if (pattern === 4) {
                colSpan = 'lg:col-span-12'
                aspectRatio = 'aspect-[21/9]'
              }

              return (
                <motion.div
                  key={project.slug}
                  className={`${colSpan} group cursor-pointer`}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden glass`}>
                    {/* Project image */}
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Project number watermark */}
                    <div className="absolute top-4 right-4 font-display text-6xl text-white/5">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Content - reveals on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-brand-sage text-xs uppercase tracking-[0.15em] font-body opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {project.categoryLabel}
                        </span>
                        <h3 className="font-display text-2xl lg:text-3xl text-brand-cream mt-1">
                          {project.title}
                        </h3>
                        <div className="h-px w-0 group-hover:w-16 bg-brand-sage mt-3 transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
