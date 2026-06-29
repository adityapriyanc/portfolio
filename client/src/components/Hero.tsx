import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Typed from 'typed.js'
import { usePortfolio } from '../context/PortfolioContext'
import ScrollReveal from './ScrollReveal'

export default function Hero() {
  const { personalInfo, typingStrings } = usePortfolio()
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!typedRef.current) return
    const typed = new Typed(typedRef.current, {
      strings: typingStrings,
      typeSpeed: 90,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
    })
    return () => typed.destroy()
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-[9%] pt-20"
    >
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <ScrollReveal className="relative z-10 max-w-[600px]">
        <h3 className="mb-2 text-2xl font-medium tracking-wider text-iris-glow">
          Hello, my name is
        </h3>
        <h1 className="mb-4 text-5xl font-extrabold leading-tight text-carbon-vellum sm:text-[4.2rem]">
          {personalInfo.name}
        </h1>
        <h3 className="mb-8 text-2xl font-medium text-carbon-vellum">
          I'm a <span ref={typedRef} className="text-iris-glow font-semibold border-r-2 border-iris-glow pr-1" />
        </h3>
        <p className="mb-10 text-lg leading-relaxed text-smoke">
          {personalInfo.description}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-iris-glow px-7 py-3.5 text-lg font-semibold text-obsidian shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,51,75,0.35)] hover:-translate-y-1"
          >
            Hire Me <i className="fas fa-paper-plane" />
          </a>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] px-7 py-3.5 text-lg font-semibold text-carbon-vellum shadow-lg transition-all duration-300 hover:border-iris-glow hover:text-iris-glow hover:shadow-[0_0_15px_rgba(255,51,75,0.15)] hover:-translate-y-1"
          >
            See My Work <i className="fas fa-arrow-right" />
          </Link>
        </div>
        <div className="mt-14 flex flex-wrap gap-6">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-8 py-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
            <span className="text-3xl font-extrabold text-iris-glow">3</span>
            <p className="mt-1 text-sm uppercase tracking-wider text-carbon-vellum">Projects</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-8 py-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
            <span className="text-3xl font-extrabold text-iris-glow">4</span>
            <p className="mt-1 text-sm uppercase tracking-wider text-carbon-vellum">Happy Clients</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-8 py-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
            <span className="text-3xl font-extrabold text-iris-glow">100%</span>
            <p className="mt-1 text-sm uppercase tracking-wider text-carbon-vellum">Passion for Code</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
