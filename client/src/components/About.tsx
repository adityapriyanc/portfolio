import { Link } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'
import ScrollReveal from './ScrollReveal'

export default function About() {
  const { personalInfo } = usePortfolio()
  const handleDownloadCV = () => {
    const cvText = `ADITYA PRIYAN C
Chennai, Tamil Nadu, India
Email: viiiaadityapriyan@gmail.com
LinkedIn: https://www.linkedin.com/in/aditya-priyan-c-911b103b1/

======================================================================
CAREER OBJECTIVE
======================================================================
I am a BTech Computer Science student with an interest in programming.
Always eager to learn new technologies, improve my skills, and gain
experience through projects and internships.

======================================================================
EDUCATION
======================================================================
* BTech, Computer Science and Engineering (Core)
  Vellore Institute of Technology (VIT), Vellore | 2025 – Present
* Higher Secondary Education (Class XII)
  Chettinad Vidyashram, Chennai | Percentage: 86%
* Secondary Education (Class X)
  Apex Pon Vidyashram, Chennai | Percentage: 96%

======================================================================
TECHNICAL SKILLS
======================================================================
- Python, C (Basic), C++ (Basic)
- Problem Solving, Algorithms & Logical Thinking

======================================================================
PROJECTS
======================================================================
* Climate-Based Cement Composition Analysis

======================================================================
LANGUAGES
======================================================================
- Tamil, English
`
    const blob = new Blob([cvText], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'Aditya_Priyan_C_CV.txt'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="about" className="px-[9%] py-32 cosmic-bg-alt">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-20 lg:grid-cols-[1fr_1.2fr]">
          <ScrollReveal direction="left" className="flex justify-center">
            <div className="about-img-ring group relative flex h-[260px] w-[260px] items-center justify-center sm:h-[330px] sm:w-[330px]">
              <div className="absolute inset-0 animate-rotate-ring rounded-full border border-dashed border-iris-glow opacity-70" />
              <div className="relative h-[calc(100%-12px)] w-[calc(100%-12px)] overflow-hidden rounded-full bg-gradient-to-br from-iris-glow to-[#e21838] p-[6px] shadow-[0_0_15px_rgba(255,51,75,0.35)] animate-float">
                <div className="h-full w-full rounded-full bg-obsidian p-[6px]">
                  <img
                    src="/profile_photo.jpg"
                    alt={personalInfo.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <h2 className="mb-8 text-left text-4xl font-bold text-carbon-vellum">
              About <span className="text-iris-glow">Me</span>
            </h2>
            <h3 className="mb-4 text-2xl font-bold text-carbon-vellum">
              CSE Student & Programmer
            </h3>
            <p className="mb-8 text-lg leading-relaxed text-ash">{personalInfo.bio}</p>

            <div className="mb-10 grid grid-cols-2 gap-4">
              <a href={`mailto:${personalInfo.email}`} className="group flex items-center gap-3 rounded-[15px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                <i className="fas fa-envelope text-xl text-iris-glow transition-transform duration-300 group-hover:scale-110" />
                <div className="min-w-0">
                  <h5 className="text-xs font-normal text-ash">Email</h5>
                  <p className="text-sm font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors truncate">{personalInfo.email}</p>
                </div>
              </a>
              <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-[15px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                <i className="fab fa-linkedin-in text-xl text-iris-glow transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h5 className="text-xs font-normal text-ash">LinkedIn</h5>
                  <p className="text-sm font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors">Connect with me</p>
                </div>
              </a>
              <a href={personalInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-[15px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                <i className="fab fa-instagram text-xl text-iris-glow transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h5 className="text-xs font-normal text-ash">Instagram</h5>
                  <p className="text-sm font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors">Follow me</p>
                </div>
              </a>
              <a href="tel:+919789974432" className="group flex items-center gap-3 rounded-[15px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                <i className="fas fa-phone text-xl text-iris-glow transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <h5 className="text-xs font-normal text-ash">Phone</h5>
                  <p className="text-sm font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors">+91 97899 74432</p>
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-20">
          <ScrollReveal>
            <div className="group rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-iris-glow/40 hover:shadow-[0_10px_40px_rgba(255,51,75,0.15)]">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-iris-glow/20 to-[#e21838]/10 px-4 py-1.5 group-hover:scale-105 transition-transform duration-300">
                <span className="text-sm">🚀</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-iris-glow">Currently Learning</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">Web Development</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ash">
                I'm actively learning modern web development — building projects with <span className="font-semibold text-carbon-vellum">React</span>,{' '}
                <span className="font-semibold text-carbon-vellum">Node.js</span>, <span className="font-semibold text-carbon-vellum">Tailwind CSS</span>, and
                exploring full-stack patterns. From crafting responsive UIs to designing RESTful APIs, I'm
                focused on becoming a well-rounded developer who can bring ideas to life on the web.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['React', 'Node.js', 'Tailwind CSS', 'TypeScript', 'MongoDB', 'REST APIs'].map((tag) => (
                  <span key={tag} className="rounded-full border border-iris-glow/20 bg-iris-glow/5 px-3 py-1 text-[11px] text-iris-glow transition-all duration-300 hover:scale-105 hover:border-iris-glow/40 hover:bg-iris-glow/10">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to="/skills"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-iris-glow/30 px-5 py-2.5 text-sm font-semibold text-iris-glow transition-all duration-300 hover:bg-iris-glow hover:text-obsidian hover:shadow-[0_0_15px_rgba(255,51,75,0.3)] hover:-translate-y-1"
              >
                Know More About My Skills <i className="fas fa-arrow-right text-xs" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-10">
          <ScrollReveal>
            <div className="group rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-iris-glow/40 hover:shadow-[0_10px_40px_rgba(255,51,75,0.15)]">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-iris-glow/10 px-4 py-1.5 transition-transform duration-300 group-hover:scale-105">
                <span className="text-sm">🔥</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-iris-glow">Drive</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">What Motivates Me</h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="group rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:bg-[rgba(255,51,75,0.04)] hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">🧠</span>
                  <h4 className="mt-3 text-base font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors">Technical Curiosity</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ash">
                    I'm driven by the desire to understand how things work under the hood. Every new framework,
                    language, or paradigm is an opportunity to scratch that itch and grow.
                  </p>
                </div>
                <div className="group rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:bg-[rgba(255,51,75,0.04)] hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">🛠️</span>
                  <h4 className="mt-3 text-base font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors">Building & Creating</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ash">
                    Nothing beats the feeling of turning an idea into something real. I love the entire process —
                    from planning and designing to coding and deploying — and seeing people use what I build.
                  </p>
                </div>
                <div className="group rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:bg-[rgba(255,51,75,0.04)] hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">🌍</span>
                  <h4 className="mt-3 text-base font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors">Real-World Impact</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ash">
                    I want my work to matter. Whether it's a tool that simplifies someone's workflow or a
                    platform that connects people, creating technology that makes a tangible difference keeps me going.
                  </p>
                </div>
                <div className="group rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-5 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:bg-[rgba(255,51,75,0.04)] hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">🤝</span>
                  <h4 className="mt-3 text-base font-semibold text-carbon-vellum group-hover:text-iris-glow transition-colors">Helping Others</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ash">
                    I believe technology is at its best when it empowers people. Sharing what I learn,
                    collaborating on open source, and building tools that make life easier for others
                    is a huge part of why I code.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-10">
          <ScrollReveal>
            <div className="group rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-iris-glow/40 hover:shadow-[0_10px_40px_rgba(255,51,75,0.15)]">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-iris-glow/10 px-4 py-1.5 transition-transform duration-300 group-hover:scale-105">
                <span className="text-sm">🎓</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-iris-glow">Academic Journey</span>
              </div>
              <h3 className="mb-8 mt-4 text-2xl font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">Where I've Studied</h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="card-pop group relative overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-gradient-to-br from-[rgba(255,51,75,0.04)] to-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-iris-glow/5 blur-2xl group-hover:bg-iris-glow/10 transition-all" />
                  <div className="relative">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-iris-glow/15 text-lg transition-transform duration-300 group-hover:scale-110">
                        🏛️
                      </span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-iris-glow/70">2025 — Present</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">B.Tech Computer Science & Engineering (Core)</h4>
                    <p className="mt-1 text-sm font-medium text-iris-glow">Vellore Institute of Technology, Vellore</p>
                    <p className="mt-3 text-sm leading-relaxed text-ash">
                      Currently diving deep into core CS — from data structures and algorithms to software engineering
                      principles. I'm also an active member of the{' '}
                      <span className="font-semibold text-carbon-vellum">Technical Domain</span> at{' '}
                      <span className="font-semibold text-carbon-vellum">SSIT</span> (Society for Social Implications of Technology),
                      a club that brings together tech enthusiasts to host technical-social events, workshops, and build
                      meaningful projects that bridge technology with community impact.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'Networking'].map((tag) => (
                      <span key={tag} className="rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[11px] text-ash transition-all duration-300 hover:scale-105 hover:border-iris-glow/30 hover:bg-iris-glow/10 hover:text-iris-glow">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card-pop group relative overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-gradient-to-br from-[rgba(255,51,75,0.04)] to-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-iris-glow/5 blur-2xl group-hover:bg-iris-glow/10 transition-all" />
                  <div className="relative">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-iris-glow/15 text-lg transition-transform duration-300 group-hover:scale-110">
                        📚
                      </span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-iris-glow/70">Higher Secondary</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">Computer Science Program (Class XII)</h4>
                    <p className="mt-1 text-sm font-medium text-iris-glow">Chettinad Vidyashram, Chennai</p>
                    <p className="mt-3 text-sm leading-relaxed text-ash">
                      This is where my programming journey truly began. I was introduced to{' '}
                      <span className="font-semibold text-carbon-vellum">Python</span> and{' '}
                      <span className="font-semibold text-carbon-vellum">SQL</span>, and discovered how they interconnect —
                      building database-driven applications and understanding how data flows between a backend and a
                      frontend. Those early projects sparked my curiosity for full-stack development and laid the
                      groundwork for everything I build today.
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Python', 'SQL', 'Python-SQL Interfacing', 'Problem Solving'].map((tag) => (
                      <span key={tag} className="rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[11px] text-ash transition-all duration-300 hover:scale-105 hover:border-iris-glow/30 hover:bg-iris-glow/10 hover:text-iris-glow">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-10">
          <ScrollReveal>
            <div className="group rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-iris-glow/40 hover:shadow-[0_10px_40px_rgba(255,51,75,0.15)]">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-iris-glow/10 px-4 py-1.5 transition-transform duration-300 group-hover:scale-105">
                <span className="text-sm">🎮</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-iris-glow">Off Duty</span>
              </div>
              <h3 className="mb-8 mt-4 text-2xl font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">When I'm Not Working</h3>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="group rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-gradient-to-br from-[rgba(255,51,75,0.03)] to-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-iris-glow/20 to-[#e21838]/10 text-2xl shadow-lg ring-1 ring-iris-glow/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    🎮
                  </span>
                  <h4 className="mb-2 text-lg font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">Gaming</h4>
                  <p className="text-sm leading-relaxed text-ash">
                    A key hobby that's been with me for years. Whether it's exploring vast open worlds, getting
                    lost in a gripping narrative, or jumping into a ranked match — gaming is my go-to escape
                    that also sharpens my reflexes and strategic thinking.
                  </p>
                </div>

                <div className="group rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-gradient-to-br from-[rgba(255,51,75,0.03)] to-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-iris-glow/20 to-[#e21838]/10 text-2xl shadow-lg ring-1 ring-iris-glow/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    🏸
                  </span>
                  <h4 className="mb-2 text-lg font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">Badminton</h4>
                  <p className="text-sm leading-relaxed text-ash">
                    Nothing beats a good rally on the court with friends. Badminton keeps me active, helps me
                    clear my head after long coding sessions, and the friendly competition always brings a lot
                    of energy. It's my favourite way to stay fit and have fun at the same time.
                  </p>
                </div>

                <div className="group rounded-[16px] border border-[rgba(255,255,255,0.06)] bg-gradient-to-br from-[rgba(255,51,75,0.03)] to-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:border-iris-glow/40 hover:shadow-[0_10px_30px_rgba(255,51,75,0.15)]">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-iris-glow/20 to-[#e21838]/10 text-2xl shadow-lg ring-1 ring-iris-glow/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    🚶
                  </span>
                  <h4 className="mb-2 text-lg font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">Long Walks</h4>
                  <p className="text-sm leading-relaxed text-ash">
                    There's something calming about stepping away from the screen and just walking. Evening
                    strolls with earphones in, some lo-fi playing, and no particular destination — it's my way
                    of resetting, reflecting on the day, and letting new ideas surface naturally.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-10">
          <div className="group rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-gradient-to-br from-iris-glow/[0.04] to-[#e21838]/[0.02] p-8 md:p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-iris-glow/40 hover:shadow-[0_10px_40px_rgba(255,51,75,0.15)]">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-iris-glow/10 px-4 py-1.5 mx-auto transition-transform duration-300 group-hover:scale-105">
              <span className="text-xs font-semibold uppercase tracking-wider text-iris-glow">Get In Touch</span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-carbon-vellum group-hover:text-iris-glow transition-colors">
              Let's Work Together
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ash">
              Whether you have a project in mind, an interesting opportunity, or just want to say hello —
              my inbox is always open. I'm actively looking for internships and collaborations, so don't
              hesitate to reach out.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-iris-glow to-[#e21838] px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,51,75,0.4)] hover:-translate-y-2 hover:scale-105"
              >
                <i className="fas fa-paper-plane transition-transform duration-300 group-hover:rotate-12" />
                Let's Communicate
              </a>
              <button
                onClick={handleDownloadCV}
                className="inline-flex items-center gap-3 rounded-full border-2 border-iris-glow px-8 py-4 text-base font-semibold text-iris-glow transition-all duration-300 hover:bg-iris-glow hover:text-obsidian hover:shadow-[0_0_20px_rgba(255,51,75,0.35)] hover:-translate-y-2 hover:scale-105"
              >
                <i className="fas fa-download transition-transform duration-300 group-hover:scale-110" />
                Download CV
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
