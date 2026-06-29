import { useEffect, useRef } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import ScrollReveal from './ScrollReveal'

const iconMap: Record<string, string> = {
  python: 'fab fa-python',
  code: 'fas fa-code',
  brain: 'fas fa-brain',
  html5: 'fab fa-html5',
}

export default function Skills() {
  const { skills, skillBadges } = usePortfolio()
  const progressRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = progressRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const bars = el.querySelectorAll<HTMLSpanElement>('[data-width]')
          bars.forEach((bar) => {
            bar.style.width = bar.dataset.width || '0%'
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      className="grid items-center gap-20 px-[9%] py-32 lg:grid-cols-[1fr_1.2fr]"
    >
      <ScrollReveal direction="left">
        <h2 className="mb-8 text-left text-4xl font-bold text-carbon-vellum">
          My <span className="text-iris-glow">Skills</span>
        </h2>
        <h3 className="mb-4 text-2xl font-bold text-carbon-vellum">
          What I Bring to the Table
        </h3>
        <p className="mb-8 text-lg leading-relaxed text-ash">
          Through my coursework and hands-on projects, I have developed technical capabilities
          spanning both frontend design frameworks and general programming languages. I am constant
          in learning, seeking to keep pace with the rapidly evolving tech landscape.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {skillBadges.map((badge) => (
            <span
              key={badge.name}
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-5 py-2 text-sm font-medium text-carbon-vellum transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-iris-glow hover:shadow-[0_0_15px_rgba(255,51,75,0.2)]"
            >
              <i className={iconMap[badge.icon] || 'fas fa-code'} />
              {badge.name}
            </span>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right">
        <div
          ref={progressRef}
          className="group rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-iris-glow/40 hover:shadow-[0_10px_40px_rgba(255,51,75,0.15)]"
        >
          {skills.map((skill) => (
            <div key={skill.name} className="mb-8 last:mb-0">
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-lg font-semibold text-carbon-vellum">{skill.name}</p>
                <span className="text-base font-semibold text-iris-glow">{skill.level}%</span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)]">
                <span
                  data-width={`${skill.level}%`}
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-iris-glow to-[#e21838] shadow-[0_0_8px_var(--color-iris-glow)] transition-all duration-[1500ms] ease-out"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
