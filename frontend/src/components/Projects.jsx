import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Download, Linkedin, Trophy, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
// Props: projectsData passed from parent

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [expanded, setExpanded] = useState(false);
  const isFeatured = project.featured;
  const descLines = project.description.split('\n\n');
  const shortDesc = descLines.slice(0, 2).join('\n\n');
  const hasMore = descLines.length > 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-xl border border-[#1E2845] bg-[#161D35]/60 backdrop-blur-sm overflow-hidden hover:border-[#7B5EEA]/30 hover:shadow-[0_0_30px_rgba(123,94,234,0.1)] transition-all duration-300 hover:-translate-y-1 ${
        isFeatured ? 'lg:col-span-2' : ''
      }`}
    >
      {isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#7B5EEA] via-[#3B6FD4] to-transparent" />
      )}

      <div className="p-6 lg:p-8">
        {/* Tags row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-xs bg-[#7B5EEA]/10 text-[#A78BFA] border border-[#7B5EEA]/15"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {tag}
            </span>
          ))}
          {project.achievement && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-[#3B6FD4]/10 text-[#3B6FD4] border border-[#3B6FD4]/20">
              <Trophy className="w-3 h-3" />
              {project.achievement}
            </span>
          )}
          {project.inProgress && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20">
              <Wrench className="w-3 h-3" />
              In Progress
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-xl lg:text-2xl font-bold text-[#F0F4FF] mb-4"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <div className="text-[#8B93B0] text-sm leading-relaxed mb-5 space-y-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          {(expanded ? descLines : shortDesc.split('\n\n')).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-[#7B5EEA] hover:text-[#A78BFA] mb-5 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        {/* Stats */}
        {project.stats && (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.stats.map(stat => (
              <span
                key={stat}
                className="px-3 py-1.5 rounded-lg text-xs bg-[#0F1525] border border-[#1E2845] text-[#8B93B0]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {stat}
              </span>
            ))}
          </div>
        )}

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map(t => (
            <span key={t} className="text-xs text-[#4A5270]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {t}{project.tech.indexOf(t) < project.tech.length - 1 ? ' \u00b7' : ''}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1E2845] text-[#8B93B0] text-sm hover:text-[#F0F4FF] hover:border-[#7B5EEA]/40 hover:bg-[#7B5EEA]/5 transition-all duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
          {project.links.details && (
            <a
              href={project.links.details}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7B5EEA] to-[#3B6FD4] text-white text-sm hover:opacity-90 transition-opacity"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <ExternalLink className="w-4 h-4" />
              View Details
            </a>
          )}
          {project.links.download && (
            <a
              href={project.links.download}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1E2845] text-[#8B93B0] text-sm hover:text-[#F0F4FF] hover:border-[#3B6FD4]/40 transition-all duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Download className="w-4 h-4" />
              Download .img
            </a>
          )}
          {project.links.linkedin && (
            <a
              href={project.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1E2845] text-[#8B93B0] text-sm hover:text-[#F0F4FF] hover:border-[#3B6FD4]/40 transition-all duration-200"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn Post
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ projectsData = {} }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="py-24 lg:py-32" style={{ background: '#0F1525' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7B5EEA]/30 to-transparent mb-16" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl lg:text-4xl font-bold text-[#F0F4FF] mb-3"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {projectsData.heading}
          </h2>
          <p className="text-[#4A5270] text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {projectsData.sub}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {projectsData.projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;