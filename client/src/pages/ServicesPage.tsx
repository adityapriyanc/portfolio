import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const services = [
  {
    category: 'Web Development',
    title: 'Full Stack Web App Development',
    short: 'Complete web applications from database to deployment, built for scale.',
    desc: 'End-to-end web applications built with modern frameworks — from database design and RESTful APIs to responsive frontends. I handle authentication, state management, deployment, and post-launch support so you get a production-ready product.',
    tech: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind'],
    deliverables: ['Full-stack architecture & development', 'RESTful API design & documentation', 'Authentication & authorization', 'Deployment & CI/CD setup'],
    price: '₹2,000',
    timeline: '1-2 weeks',
    featured: true,
  },
  {
    category: 'Web Development',
    title: 'Frontend React / Next.js Development',
    short: 'Blazing-fast, beautifully crafted React & Next.js interfaces.',
    desc: 'High-performance frontends built with React or Next.js. Component-driven architecture with TypeScript, state management, SSR/SSG, and smooth animations for a seamless experience across every device.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer'],
    deliverables: ['Component library & design system', 'Server-side rendering setup', 'Performance optimization', 'Responsive & mobile-first layout'],
    price: '₹2,500',
    timeline: '1-2 weeks',
  },
  {
    category: '3D & Interactive',
    title: '3D & Interactive Web Experiences',
    short: 'Immersive Three.js & WebGL experiences that captivate users.',
    desc: 'Immersive 3D websites using Three.js, custom GLSL shaders, and WebGL. From rotating product showcases to full interactive scenes — perfect for portfolios, landing pages, and brand experiences.',
    tech: ['Three.js', 'WebGL', 'GLSL', 'React Three Fiber'],
    deliverables: ['3D scene design & development', 'Custom shader programming', 'Optimized performance', 'Interactive animations'],
    price: '₹3,000',
    timeline: '2-3 weeks',
    featured: true,
  },
  {
    category: 'Backend & API',
    title: 'Backend API Development',
    short: 'Scalable APIs with Node.js — secure, documented, production-ready.',
    desc: 'Secure, scalable backend systems with Node.js, Express, and your choice of MongoDB or PostgreSQL. Includes JWT authentication, role-based access, API documentation, and one-click deployment.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Docker'],
    deliverables: ['RESTful & GraphQL APIs', 'Database schema design', 'Authentication & authorization', 'API documentation (Swagger)'],
    price: '₹2,700',
    timeline: '1-2 weeks',
  },
  {
    category: 'Mobile Development',
    title: 'Mobile App (React Native)',
    short: 'Cross-platform mobile apps with React Native — iOS & Android.',
    desc: 'Cross-platform iOS and Android apps built with React Native. Shared codebase means faster development and easier maintenance. I handle push notifications, in-app purchases, and store submission.',
    tech: ['React Native', 'Expo', 'Firebase', 'TypeScript'],
    deliverables: ['Cross-platform mobile app', 'App store deployment', 'Push notifications', 'API integration'],
    price: '₹2,700',
    timeline: '2-3 weeks',
  },
  {
    category: 'UI/UX Design',
    title: 'UI/UX Consulting & Design Systems',
    short: 'User-centric design that transforms ideas into intuitive interfaces.',
    desc: 'User research, wireframing, high-fidelity prototypes, and full design systems. I audit your current UX, identify friction points, and deliver a cohesive design language — from colour palettes to reusable component libraries.',
    tech: ['Figma', 'Framer', 'Prototyping', 'Design Systems'],
    deliverables: ['UX audit & research report', 'Wireframes & prototypes', 'Design system & style guide', 'Component library handoff'],
    price: '₹2,300',
    timeline: '1-2 weeks',
  },
]

const categories = ['All', 'Web Development', '3D & Interactive', 'Backend & API', 'Mobile Development', 'UI/UX Design']

export default function ServicesPage() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<typeof services[number] | null>(null)

  const filtered = filter === 'All'
    ? services
    : services.filter((s) => s.category === filter)

  return (
    <section className="px-[9%] pt-36 pb-32">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="border-b border-[rgba(255,255,255,0.06)] pb-14">
          <ScrollReveal>
            <span className="eyebrow">SERVICES</span>
          </ScrollReveal>
          <ScrollReveal delay={0.07}>
            <h1 className="mt-4 text-4xl font-extrabold text-carbon-vellum sm:text-5xl">
              What I <span className="text-iris-glow">Build</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash">
              From full-stack applications to immersive 3D experiences — production-grade
              development with transparent pricing and clear deliverables.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.17}>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-iris-glow/20 bg-iris-glow/5 px-4 py-1.5 text-xs font-semibold text-iris-glow">
                <span className="h-1.5 w-1.5 rounded-full bg-iris-glow" />
                6 Services
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-iris-glow/20 bg-iris-glow/5 px-4 py-1.5 text-xs font-semibold text-iris-glow">
                <span className="h-1.5 w-1.5 rounded-full bg-iris-glow" />
                Starting at ₹2,000
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5 text-xs font-semibold text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Available
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Filter */}
        <ScrollReveal delay={0.22}>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  filter === cat
                    ? 'bg-iris-glow text-obsidian shadow-[0_0_12px_rgba(255,51,75,0.3)]'
                    : 'border border-[rgba(255,255,255,0.1)] text-ash hover:border-iris-glow/40 hover:text-iris-glow'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Service Cards Grid */}
        <div className="mt-8 grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
          {filtered.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} onRequest={() => setSelected(service)} />
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="relative mt-24 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] px-8 py-14 text-center sm:px-14">
            <div className="absolute inset-0 bg-gradient-to-br from-iris-glow/[0.03] to-[#e21838]/[0.01]" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-carbon-vellum sm:text-4xl">
                Have a Different Project in <span className="text-iris-glow">Mind?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ash">
                Let's talk about your idea — every great product starts with a conversation.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-iris-glow px-8 py-4 text-base font-bold text-obsidian shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,51,75,0.4)] hover:-translate-y-1 hover:scale-[1.02]"
              >
                Get in Touch
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Inquiry Modal */}
      {selected && (
        <InquiryModal service={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

function ServiceCard({ service, index, onRequest }: {
  service: typeof services[number]
  index: number
  onRequest: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <ScrollReveal delay={index * 0.08}>
      <article
        className="group card relative flex flex-col overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] transition-all duration-500"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Animated gradient border overlay */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 rounded-[16px] opacity-0 transition-all duration-500 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from ${hovered ? '0deg' : '360deg'}, rgba(255,51,75,0.4) 0deg, transparent 60deg, transparent 300deg, rgba(255,51,75,0.4) 360deg)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
            transition: 'background 1s ease-in-out, opacity 0.5s',
          }}
        />

        <div className="flex flex-1 flex-col p-6">
          {/* Category + Featured */}
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-iris-glow/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-iris-glow">
              {service.category}
            </span>
            {service.featured && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-iris-glow">
                ✨ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">
            {service.title}
          </h3>

          {/* Short description */}
          <p className="mt-2 text-sm leading-relaxed text-ash">
            {service.short}
          </p>

          {/* Tech stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {service.tech.map((t) => (
              <span key={t} className="rounded-md border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] px-2 py-0.5 text-[10px] text-ash transition-all group-hover:border-iris-glow/20 group-hover:text-iris-glow">
                {t}
              </span>
            ))}
          </div>

          {/* Deliverables */}
          <div className="mt-5 space-y-2">
            {service.deliverables.slice(0, 3).map((d) => (
              <div key={d} className="flex items-start gap-2 text-xs text-ash">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-iris-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {d}
              </div>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-4">
            <div>
              <span className="text-xl font-extrabold text-iris-glow">{service.price}</span>
              <span className="ml-2 text-[10px] text-ash">{service.timeline}</span>
            </div>
            <button
              onClick={onRequest}
              className="rounded-full bg-iris-glow/10 px-4 py-2 text-xs font-bold text-iris-glow transition-all duration-300 hover:bg-iris-glow hover:text-obsidian hover:shadow-[0_0_15px_rgba(255,51,75,0.3)]"
            >
              Request Service
            </button>
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}

function InquiryModal({ service, onClose }: { service: typeof services[number]; onClose: () => void }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '', budget: '', timeline: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const { submitInquiry } = await import('../data/api')
      await submitInquiry({ ...form, serviceName: service.title })
      setStatus('success')
      setTimeout(() => onClose(), 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[rgba(255,255,255,0.1)] bg-obsidian p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-ash hover:text-carbon-vellum transition-colors">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        <span className="text-[10px] font-semibold uppercase tracking-wider text-iris-glow">Request Service</span>
        <h3 className="mt-2 text-xl font-bold text-carbon-vellum">{service.title}</h3>
        <p className="mt-1 text-sm text-ash">{service.price} · {service.timeline}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-carbon-vellum">Name *</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-carbon-vellum placeholder:text-ash/50 outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]"
                placeholder="Your name" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-carbon-vellum">Email *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-carbon-vellum placeholder:text-ash/50 outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]"
                placeholder="your@email.com" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-carbon-vellum">Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-carbon-vellum placeholder:text-ash/50 outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]"
              placeholder="+91 98765 43210" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-carbon-vellum">Budget</label>
              <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-carbon-vellum outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]">
                <option value="">Select budget range</option>
                <option value="1k">Under ₹1,000</option>
                <option value="1-5k">₹1,000 - ₹5,000</option>
                <option value="5-15k">₹5,000 - ₹15,000</option>
                <option value="15-50k">₹15,000 - ₹50,000</option>
                <option value="50k+">₹50,000+</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-carbon-vellum">Timeline</label>
              <select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-carbon-vellum outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)]">
                <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-2w">1-2 weeks</option>
                <option value="1m">1 month</option>
                <option value="2-3m">2-3 months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-carbon-vellum">Message *</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={3}
              className="w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm text-carbon-vellum placeholder:text-ash/50 outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_8px_rgba(255,51,75,0.15)] resize-none"
              placeholder="Tell me about your project..." />
          </div>

          <button type="submit" disabled={status === 'loading'}
            className="w-full rounded-xl bg-iris-glow px-6 py-3 text-sm font-bold text-obsidian transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,51,75,0.4)] disabled:opacity-50">
            {status === 'loading' ? 'Sending...' : 'Send Request'}
          </button>

          {status === 'success' && (
            <p className="text-center text-sm text-green-400">Request sent! I'll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="text-center text-sm text-red-400">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  )
}
