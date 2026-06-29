import { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import ScrollReveal from './ScrollReveal'

export default function Contact() {
  const { personalInfo } = usePortfolio()
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      })

      if (!res.ok) throw new Error('Failed to send')

      setToast({ message: `Thank you, ${name}! Message sent.`, visible: true })
      form.reset()
    } catch {
      setToast({ message: 'Something went wrong. Try again later.', visible: true })
    }

    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 4000)
  }

  return (
    <section
      id="contact"
      className="grid items-start gap-20 px-[9%] py-32 cosmic-bg-alt lg:grid-cols-[1fr_1.2fr]"
    >
      <ScrollReveal direction="left">
        <h2 className="mb-8 text-left text-4xl font-bold text-carbon-vellum">
          Contact <span className="text-iris-glow">Me</span>
        </h2>
        <h3 className="mb-4 text-2xl font-bold text-carbon-vellum">
          Let's Work Together
        </h3>
        <p className="mb-10 text-lg leading-relaxed text-ash">
          Whether you want to discuss a potential project, academic collaboration, or just say
          hello, feel free to drop a message. I will do my best to get back to you as soon as
          possible!
        </p>

        <div className="mb-12 space-y-6">
          <div className="group flex items-center gap-5 rounded-[15px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[rgba(255,51,75,0.2)] bg-[rgba(255,51,75,0.08)] text-iris-glow shadow-[0_0_10px_rgba(255,51,75,0.1)] transition-transform duration-300 group-hover:scale-110">
              <i className="fas fa-user text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors">Name</h4>
              <p className="text-sm text-ash">{personalInfo.name}</p>
            </div>
          </div>

          <div className="group flex items-center gap-5 rounded-[15px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[rgba(255,51,75,0.2)] bg-[rgba(255,51,75,0.08)] text-iris-glow shadow-[0_0_10px_rgba(255,51,75,0.1)] transition-transform duration-300 group-hover:scale-110">
              <i className="fas fa-envelope text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors">Email</h4>
              <p className="text-sm text-ash">{personalInfo.email}</p>
            </div>
          </div>

          <div className="group flex items-center gap-5 rounded-[15px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-[rgba(255,51,75,0.2)] bg-[rgba(255,51,75,0.08)] text-iris-glow shadow-[0_0_10px_rgba(255,51,75,0.1)] transition-transform duration-300 group-hover:scale-110">
              <i className="fas fa-map-marker-alt text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors">Location</h4>
              <p className="text-sm text-ash">{personalInfo.location}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-4 text-lg font-medium text-carbon-vellum">Follow Me</p>
          <div className="flex gap-4">
            {[
              { icon: 'fab fa-facebook-f', url: personalInfo.social.facebook },
              { icon: 'fab fa-twitter', url: personalInfo.social.twitter },
              { icon: 'fab fa-instagram', url: personalInfo.social.instagram },
            ].map((s) => (
              <a
                key={s.icon}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-carbon-vellum transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:bg-iris-glow hover:text-obsidian hover:border-iris-glow hover:shadow-[0_0_20px_rgba(255,51,75,0.4)]"
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right">
        <form
          onSubmit={handleSubmit}
          className="group rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-iris-glow/40 hover:shadow-[0_10px_40px_rgba(255,51,75,0.15)]"
        >
          <div className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-5 py-4 text-base text-carbon-vellum placeholder-ash outline-none transition-all duration-300 focus:border-iris-glow focus:shadow-[0_0_10px_rgba(255,51,75,0.15)] focus:bg-[rgba(0,0,0,0.35)]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-5 py-4 text-base text-carbon-vellum placeholder-ash outline-none transition-all duration-300 focus:border-iris-glow focus:shadow-[0_0_10px_rgba(255,51,75,0.15)] focus:bg-[rgba(0,0,0,0.35)]"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-5 py-4 text-base text-carbon-vellum placeholder-ash outline-none transition-all duration-300 focus:border-iris-glow focus:shadow-[0_0_10px_rgba(255,51,75,0.15)] focus:bg-[rgba(0,0,0,0.35)]"
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              className="w-full resize-none rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-5 py-4 text-base text-carbon-vellum placeholder-ash outline-none transition-all duration-300 focus:border-iris-glow focus:shadow-[0_0_10px_rgba(255,51,75,0.15)] focus:bg-[rgba(0,0,0,0.35)]"
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-iris-glow px-7 py-4 text-lg font-semibold text-obsidian shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,51,75,0.4)]"
            >
              Send Message <i className="fas fa-paper-plane" />
            </button>
          </div>
        </form>
      </ScrollReveal>

      <div
        className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-8 sm:right-8 z-[1000] flex items-center gap-2.5 rounded-[10px] bg-[#10b981] px-6 py-4 font-semibold text-white shadow-lg transition-all duration-400 sm:max-w-xs ${
          toast.visible ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'
        }`}
      >
        <i className="fas fa-check-circle" />
        <span>{toast.message}</span>
      </div>
    </section>
  )
}
