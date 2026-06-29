import { usePortfolio } from '../context/PortfolioContext'
import ScrollReveal from './ScrollReveal'

export default function Projects() {
  const { projects, currentlyBuilding } = usePortfolio()
  return (
    <section id="work" className="px-[9%] pt-24 pb-32 space-y-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16">
          <span className="eyebrow">SELECTED WORK</span>
          <h2 className="mt-4 text-4xl font-bold text-carbon-vellum sm:text-5xl">
            My <span className="text-iris-glow">Projects</span>
          </h2>
        </div>

        <div className="space-y-24">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 150}>
              <div className="group rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-iris-glow/40 hover:shadow-[0_10px_40px_rgba(255,51,75,0.15)] sm:flex">
                <div className="sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden bg-gradient-to-br from-iris-glow/5 to-[#e21838]/5">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover sm:h-full" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-6xl font-bold text-iris-glow/20">
                        {project.title.split(' ').map(w => w[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-8 sm:w-3/5 sm:self-center">
                  <h3 className="text-xl font-semibold text-carbon-vellum">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-3 py-1 text-xs text-smoke"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.lessons && (
                    <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                      <h4 className="text-sm font-semibold text-iris-glow uppercase tracking-wider mb-3">
                        What I Learned
                      </h4>
                      <ul className="space-y-2">
                        {project.lessons.map((lesson, li) => (
                          <li key={li} className="flex items-start gap-2 text-sm text-ash">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-iris-glow flex-shrink-0" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12">
          <span className="eyebrow">WHAT'S NEXT</span>
          <h2 className="mt-4 text-4xl font-bold text-carbon-vellum sm:text-5xl">
            Currently <span className="text-iris-glow">Building</span>
          </h2>
        </div>

        <ScrollReveal>
          <div className="group rounded-[20px] border border-iris-glow/30 bg-gradient-to-br from-iris-glow/5 to-[#e21838]/10 p-8 md:p-12 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-iris-glow/60 hover:shadow-[0_10px_40px_rgba(255,51,75,0.15)]">
            <div className="flex items-start gap-3 mb-4">
              <span className="mt-1 h-3 w-3 rounded-full bg-iris-glow animate-pulse flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-carbon-vellum">
                  {currentlyBuilding.title}
                </h3>
                <p className="text-sm text-iris-glow font-medium mt-1">
                  {currentlyBuilding.subtitle}
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-ash max-w-2xl">
              {currentlyBuilding.description}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {currentlyBuilding.features.map((f, fi) => (
                <div key={fi} className="flex items-start gap-2 text-sm text-ash">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-iris-glow flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {currentlyBuilding.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-iris-glow/30 px-3 py-1 text-xs text-smoke"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
