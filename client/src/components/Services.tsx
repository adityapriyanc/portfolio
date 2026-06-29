import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'
import { submitInquiry } from '../data/api'
import ScrollReveal from './ScrollReveal'

const steps = [
  { num: '01', title: 'Discovery & Planning', desc: 'Understanding your requirements, defining project scope, and setting clear milestones.' },
  { num: '02', title: 'Design & Prototyping', desc: 'Creating wireframes, UI/UX mockups, and planning the architecture.' },
  { num: '03', title: 'Development', desc: 'Building the frontend and backend with clean code and regular updates.' },
  { num: '04', title: 'Testing & QA', desc: 'Rigorous unit testing, integration testing, and fixing every bug before launch.' },
  { num: '05', title: 'Deployment & Launch', desc: 'Setting up servers, configuring domains, and deploying the final product.' },
  { num: '06', title: 'Maintenance & Support', desc: 'Monitoring performance, rolling out updates, and providing ongoing support.' },
]

export default function Services() {
  const { services } = usePortfolio()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', serviceName: '', message: '', budget: '', timeline: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitInquiry(form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', serviceName: '', message: '', budget: '', timeline: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="services" className="px-[9%] pt-24 pb-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16">
          <span className="eyebrow">WHAT I OFFER</span>
          <h2 className="mt-4 text-4xl font-bold text-carbon-vellum sm:text-5xl">
            I <span className="text-iris-glow">Offer</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 100}>
              <div className="group h-full rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                <span className="mb-4 block text-4xl">{service.icon}</span>
                <h3 className="mb-3 text-xl font-semibold text-carbon-vellum">
                  {service.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-ash">
                  {service.description}
                </p>
                <ul className="space-y-2.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ash">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-iris-glow" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-24">
            <div className="mb-12 text-center">
              <span className="eyebrow">HOW I WORK</span>
              <h2 className="mt-4 text-4xl font-bold text-carbon-vellum sm:text-5xl">
                Step by Step <span className="text-iris-glow">Process</span>
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-[27px] top-0 h-full w-px bg-gradient-to-b from-iris-glow via-iris-glow/30 to-transparent sm:left-1/2 sm:-translate-x-px" />
              <div className="space-y-12">
                {steps.map((step, i) => (
                  <div key={step.num} className={`relative flex flex-col gap-6 sm:flex-row ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    <div className="hidden sm:block sm:w-1/2" />
                    <div className="relative flex items-start gap-4 sm:w-1/2">
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-iris-glow/40 bg-obsidian text-lg font-bold text-iris-glow shadow-[0_0_12px_rgba(255,51,75,0.2)]">
                        {step.num}
                      </div>
                      <div className="group rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                        <h3 className="mb-2 text-lg font-semibold text-carbon-vellum">{step.title}</h3>
                        <p className="text-sm leading-relaxed text-ash">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-24 text-center">
            <span className="eyebrow">ABOUT ME</span>
            <h2 className="mt-4 mb-6 text-4xl font-bold text-carbon-vellum sm:text-5xl">
              Basically I <span className="text-iris-glow">Am</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-ash">
              A B.Tech student trying to learn and create more.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-iris-glow/40 px-7 py-3.5 text-lg font-semibold text-iris-glow shadow-lg transition-all duration-300 hover:bg-iris-glow hover:text-obsidian hover:shadow-[0_0_15px_rgba(255,51,75,0.35)] hover:-translate-y-1"
            >
              Know More About Me <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="inquire" className="group mt-24 rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 md:p-12 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-iris-glow/40 hover:shadow-[0_10px_40px_rgba(255,51,75,0.15)]">
            <div className="mb-8 text-center">
              <span className="eyebrow">LET'S COLLABORATE</span>
              <h3 className="mt-3 text-3xl font-bold text-carbon-vellum">
                Have an Idea to Be Executed? Let Me Know and We Can{' '}
                <span className="text-iris-glow">Do It Together!</span>
              </h3>
              <p className="mt-2 text-sm text-ash">
                Tell me about your project and I'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-carbon-vellum">Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-carbon-vellum placeholder:text-ash/50 outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-carbon-vellum">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-carbon-vellum placeholder:text-ash/50 outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]"
                    placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-carbon-vellum">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-carbon-vellum placeholder:text-ash/50 outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]"
                    placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-carbon-vellum">Service *</label>
                  <select value={form.serviceName} onChange={(e) => setForm({ ...form, serviceName: e.target.value })} required
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-carbon-vellum outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]">
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-carbon-vellum">Budget</label>
                  <input value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-carbon-vellum placeholder:text-ash/50 outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]"
                    placeholder="e.g. ₹10,000 - ₹50,000" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-carbon-vellum">Timeline</label>
                  <input value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-carbon-vellum placeholder:text-ash/50 outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]"
                    placeholder="e.g. 2 weeks" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-carbon-vellum">Message *</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={4}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-sm text-carbon-vellum placeholder:text-ash/50 outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)] resize-none"
                  placeholder="Tell me about your project requirements..." />
              </div>

              <button type="submit" disabled={status === 'loading'}
                className="w-full rounded-xl bg-gradient-to-r from-iris-glow to-[#e21838] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,51,75,0.4)] disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
              </button>

              {status === 'success' && (
                <p className="text-center text-sm text-green-400">Inquiry sent! I'll get back to you soon.</p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm text-red-400">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
