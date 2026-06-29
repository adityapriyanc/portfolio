import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout, updateSection, getInquiries, updateInquiry, deleteInquiry } from '../data/api'
import { usePortfolio, useRefreshPortfolio } from '../context/PortfolioContext'

type Tab = 'info' | 'skills' | 'projects' | 'services' | 'building' | 'footer' | 'inquiries'
interface InquiryItem {
  _id: string
  name: string
  email: string
  phone?: string
  serviceName: string
  message: string
  budget?: string
  timeline?: string
  status: string
  adminNotes?: string
  createdAt: string
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const data = usePortfolio()
  const refresh = useRefreshPortfolio()
  const [tab, setTab] = useState<Tab>('info')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; ok: boolean } | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [info, setInfo] = useState({ ...data.personalInfo })
  const [skills, setSkills] = useState([...data.skills])
  const [projects, setProjects] = useState([...data.projects])
  const [services, setServices] = useState([...data.services])
  const [building, setBuilding] = useState({ ...data.currentlyBuilding })
  const [footer, setFooter] = useState({ ...data.footer })
  const [inquiries, setInquiries] = useState<InquiryItem[]>([])

  useEffect(() => {
    if (tab === 'inquiries') {
      getInquiries().then(setInquiries).catch(() => {})
    }
  }, [tab])

  const showToast = (message: string, ok: boolean) => {
    setToast({ message, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const saveSection = async (section: string, data: unknown, label: string) => {
    setSaving(true)
    try {
      await updateSection(section, data)
      refresh()
      showToast(`${label} saved!`, true)
    } catch (err: any) {
      showToast(err.message || 'Failed to save', false)
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateInquiry(id, { status })
      setInquiries((prev) => prev.map((i) => (i._id === id ? { ...i, status } : i)))
      showToast('Status updated', true)
    } catch {
      showToast('Failed to update status', false)
    }
  }

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    try {
      await deleteInquiry(id)
      setInquiries((prev) => prev.filter((i) => i._id !== id))
      showToast('Deleted', true)
    } catch {
      showToast('Failed to delete', false)
    }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'info', label: 'Personal Info' },
    { key: 'skills', label: 'Skills' },
    { key: 'projects', label: 'Projects' },
    { key: 'services', label: 'Services' },
    { key: 'building', label: 'Currently Building' },
    { key: 'footer', label: 'Footer' },
    { key: 'inquiries', label: `Inquiries (${inquiries.length})` },
  ]

  return (
    <div className="min-h-screen cosmic-bg">
      <header className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-4 sm:px-[9%] py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex flex-col gap-1 md:hidden"
            aria-label="Toggle sidebar"
          >
            <span className={`block h-0.5 w-5 bg-carbon-vellum transition-all ${sidebarOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 w-5 bg-carbon-vellum transition-all ${sidebarOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-carbon-vellum transition-all ${sidebarOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
          <h1 className="text-xl font-bold text-carbon-vellum">
            Admin <span className="text-iris-glow">Panel</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm text-ash hover:text-iris-glow transition-colors hidden sm:inline">View Site</a>
          <button
            onClick={handleLogout}
            className="rounded-full border border-iris-glow px-4 py-2 text-sm text-iris-glow transition-all hover:bg-iris-glow hover:text-obsidian"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <nav className={`flex flex-col gap-1 border-r border-[rgba(255,255,255,0.08)] p-6 min-w-[200px] transition-all duration-300 ${
          sidebarOpen
            ? 'fixed left-0 top-0 z-40 h-full bg-[rgba(11,12,16,0.98)] backdrop-blur-[15px] pt-20'
            : 'hidden md:flex'
        }`}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setSidebarOpen(false) }}
              className={`rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${
                tab === t.key
                  ? 'bg-iris-glow text-obsidian'
                  : 'text-ash hover:text-carbon-vellum hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 p-4 sm:p-8 max-w-3xl overflow-x-hidden">
          {tab === 'info' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-carbon-vellum">Personal Info</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Name" value={info.name} onChange={(v) => setInfo({ ...info, name: v })} />
                <Input label="Tagline" value={info.tagline} onChange={(v) => setInfo({ ...info, tagline: v })} />
                <Input label="Email" value={info.email} onChange={(v) => setInfo({ ...info, email: v })} />
                <Input label="Location" value={info.location} onChange={(v) => setInfo({ ...info, location: v })} />
                <Input label="Education" value={info.education} className="sm:col-span-2" onChange={(v) => setInfo({ ...info, education: v })} />
              </div>
              <Textarea label="Description" value={info.description} onChange={(v) => setInfo({ ...info, description: v })} />
              <Textarea label="Bio" value={info.bio} onChange={(v) => setInfo({ ...info, bio: v })} />

              <h3 className="text-lg font-semibold text-carbon-vellum mt-8">Social Links</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="LinkedIn" value={info.social.linkedin} onChange={(v) => setInfo({ ...info, social: { ...info.social, linkedin: v } })} />
                <Input label="GitHub" value={info.social.github} onChange={(v) => setInfo({ ...info, social: { ...info.social, github: v } })} />
                <Input label="Facebook" value={info.social.facebook} onChange={(v) => setInfo({ ...info, social: { ...info.social, facebook: v } })} />
                <Input label="Twitter" value={info.social.twitter} onChange={(v) => setInfo({ ...info, social: { ...info.social, twitter: v } })} />
                <Input label="Instagram" value={info.social.instagram} onChange={(v) => setInfo({ ...info, social: { ...info.social, instagram: v } })} />
              </div>

              <button onClick={() => saveSection('personalInfo', info, 'Personal info')} disabled={saving} className="rounded-full bg-iris-glow px-6 py-3 font-semibold text-obsidian hover:shadow-[0_0_15px_rgba(255,51,75,0.35)] disabled:opacity-50 transition-all">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {tab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-carbon-vellum">Skills</h2>
                <button
                  onClick={() => setSkills([...skills, { name: '', level: 50, category: 'backend' }])}
                  className="rounded-full border border-iris-glow px-4 py-2 text-sm text-iris-glow hover:bg-iris-glow hover:text-obsidian transition-all"
                >
                  + Add Skill
                </button>
              </div>

              <div className="space-y-3">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4">
                    <input
                      value={skill.name}
                      onChange={(e) => {
                        const copy = [...skills]
                        copy[i] = { ...copy[i], name: e.target.value }
                        setSkills(copy)
                      }}
                      placeholder="Skill name"
                      className="flex-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-3 py-2 text-sm text-carbon-vellum outline-none focus:border-iris-glow"
                    />
                    <input
                      type="number"
                      value={skill.level}
                      onChange={(e) => {
                        const copy = [...skills]
                        copy[i] = { ...copy[i], level: Math.min(100, Math.max(0, Number(e.target.value))) }
                        setSkills(copy)
                      }}
                      min={0}
                      max={100}
                      className="w-20 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-3 py-2 text-sm text-carbon-vellum outline-none focus:border-iris-glow text-center"
                    />
                    <span className="text-sm text-ash w-8">{skill.level}%</span>
                    <button
                      onClick={() => setSkills(skills.filter((_, j) => j !== i))}
                      className="text-iris-glow hover:text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={() => saveSection('skills', skills, 'Skills')} disabled={saving} className="rounded-full bg-iris-glow px-6 py-3 font-semibold text-obsidian hover:shadow-[0_0_15px_rgba(255,51,75,0.35)] disabled:opacity-50 transition-all">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {tab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-carbon-vellum">Projects</h2>
                <button
                  onClick={() =>
                    setProjects([
                      ...projects,
                      { title: '', description: '', tech: [], lessons: [], image: '', github: '', live: '' },
                    ])
                  }
                  className="rounded-full border border-iris-glow px-4 py-2 text-sm text-iris-glow hover:bg-iris-glow hover:text-obsidian transition-all"
                >
                  + Add Project
                </button>
              </div>

              <div className="space-y-6">
                {projects.map((project, i) => (
                  <div key={i} className="rounded-[15px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-carbon-vellum">Project {i + 1}</h3>
                      <button
                        onClick={() => setProjects(projects.filter((_, j) => j !== i))}
                        className="text-iris-glow hover:text-red-400 transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <Input label="Title" value={project.title} onChange={(v) => {
                        const copy = [...projects]; copy[i] = { ...copy[i], title: v }; setProjects(copy)
                      }} />
                      <Textarea label="Description" value={project.description} onChange={(v) => {
                        const copy = [...projects]; copy[i] = { ...copy[i], description: v }; setProjects(copy)
                      }} />
                      <Input label="Image path" value={project.image || ''} onChange={(v) => {
                        const copy = [...projects]; copy[i] = { ...copy[i], image: v }; setProjects(copy)
                      }} />
                      <Input label="Tech (comma separated)" value={project.tech.join(', ')} onChange={(v) => {
                        const copy = [...projects]; copy[i] = { ...copy[i], tech: v.split(',').map(s => s.trim()).filter(Boolean) }; setProjects(copy)
                      }} />
                      <Textarea label="Lessons (one per line)" value={(project.lessons || []).join('\n')} onChange={(v) => {
                        const copy = [...projects]; copy[i] = { ...copy[i], lessons: v.split('\n').filter(Boolean) }; setProjects(copy)
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => saveSection('projects', projects, 'Projects')} disabled={saving} className="rounded-full bg-iris-glow px-6 py-3 font-semibold text-obsidian hover:shadow-[0_0_15px_rgba(255,51,75,0.35)] disabled:opacity-50 transition-all">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {tab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-carbon-vellum">Services</h2>
                <button
                  onClick={() =>
                    setServices([...services, { title: '', description: '', icon: '🚀', features: [] }])
                  }
                  className="rounded-full border border-iris-glow px-4 py-2 text-sm text-iris-glow hover:bg-iris-glow hover:text-obsidian transition-all"
                >
                  + Add Service
                </button>
              </div>

              <div className="space-y-6">
                {services.map((service, i) => (
                  <div key={i} className="rounded-[15px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-carbon-vellum">Service {i + 1}</h3>
                      <button
                        onClick={() => setServices(services.filter((_, j) => j !== i))}
                        className="text-iris-glow hover:text-red-400 transition-colors text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <Input label="Title" value={service.title} onChange={(v) => {
                        const copy = [...services]; copy[i] = { ...copy[i], title: v }; setServices(copy)
                      }} />
                      <Input label="Icon (emoji)" value={service.icon} onChange={(v) => {
                        const copy = [...services]; copy[i] = { ...copy[i], icon: v }; setServices(copy)
                      }} />
                      <Textarea label="Description" value={service.description} onChange={(v) => {
                        const copy = [...services]; copy[i] = { ...copy[i], description: v }; setServices(copy)
                      }} />
                      <Textarea label="Features (one per line)" value={(service.features || []).join('\n')} onChange={(v) => {
                        const copy = [...services]; copy[i] = { ...copy[i], features: v.split('\n').filter(Boolean) }; setServices(copy)
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => saveSection('services', services, 'Services')} disabled={saving} className="rounded-full bg-iris-glow px-6 py-3 font-semibold text-obsidian hover:shadow-[0_0_15px_rgba(255,51,75,0.35)] disabled:opacity-50 transition-all">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {tab === 'building' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-carbon-vellum">Currently Building</h2>
              <div className="space-y-4">
                <Input label="Title" value={building.title} onChange={(v) => setBuilding({ ...building, title: v })} />
                <Input label="Subtitle" value={building.subtitle} onChange={(v) => setBuilding({ ...building, subtitle: v })} />
                <Textarea label="Description" value={building.description} onChange={(v) => setBuilding({ ...building, description: v })} />
                <Textarea label="Features (one per line)" value={building.features.join('\n')} onChange={(v) => setBuilding({ ...building, features: v.split('\n').filter(Boolean) })} />
                <Input label="Tech (comma separated)" value={building.tech.join(', ')} onChange={(v) => setBuilding({ ...building, tech: v.split(',').map(s => s.trim()).filter(Boolean) })} />
              </div>
              <button onClick={() => saveSection('currentlyBuilding', building, 'Currently Building')} disabled={saving} className="rounded-full bg-iris-glow px-6 py-3 font-semibold text-obsidian hover:shadow-[0_0_15px_rgba(255,51,75,0.35)] disabled:opacity-50 transition-all">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {tab === 'footer' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-carbon-vellum">Footer</h2>
              <p className="text-sm text-ash">Use <code className="text-iris-glow">{'{year}'}</code> for the current year.</p>
              <Textarea label="Footer Text" value={footer.text} onChange={(v) => setFooter({ ...footer, text: v })} />
              <button onClick={() => saveSection('footer', footer, 'Footer')} disabled={saving} className="rounded-full bg-iris-glow px-6 py-3 font-semibold text-obsidian hover:shadow-[0_0_15px_rgba(255,51,75,0.35)] disabled:opacity-50 transition-all">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {tab === 'inquiries' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-carbon-vellum">Service Inquiries</h2>
              {inquiries.length === 0 ? (
                <p className="text-ash">No inquiries yet.</p>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div key={inq._id} className="rounded-[15px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-carbon-vellum">{inq.name}</h3>
                          <p className="text-xs text-ash">{inq.email} {inq.phone && `| ${inq.phone}`}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                            className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-2 py-1 text-xs text-carbon-vellum outline-none"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => handleDeleteInquiry(inq._id)}
                            className="text-iris-glow hover:text-red-400 text-xs transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="rounded-full border border-iris-glow/30 bg-iris-glow/10 px-3 py-0.5 text-xs text-iris-glow">
                          {inq.serviceName}
                        </span>
                        {inq.budget && (
                          <span className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-3 py-0.5 text-xs text-ash">
                            Budget: {inq.budget}
                          </span>
                        )}
                        {inq.timeline && (
                          <span className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] px-3 py-0.5 text-xs text-ash">
                            Timeline: {inq.timeline}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-ash leading-relaxed">{inq.message}</p>
                      <p className="mt-2 text-xs text-ash/60">{new Date(inq.createdAt).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div
          className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-8 sm:right-8 z-[1000] flex items-center gap-2.5 rounded-[10px] px-6 py-4 font-semibold text-white shadow-lg transition-all duration-400 sm:max-w-xs ${
            toast.ok ? 'bg-[#10b981]' : 'bg-iris-glow'
          }`}
        >
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  )
}

function Input({ label, value, onChange, className }: { label: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm text-ash">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-4 py-3 text-sm text-carbon-vellum outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_10px_rgba(255,51,75,0.15)]"
      />
    </div>
  )
}

function Textarea({ label, value, onChange, className }: { label: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm text-ash">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full resize-none rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-4 py-3 text-sm text-carbon-vellum outline-none transition-all focus:border-iris-glow focus:shadow-[0_0_10px_rgba(255,51,75,0.15)]"
      />
    </div>
  )
}
