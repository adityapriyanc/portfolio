const API_BASE = '/api'

function getToken(): string | null {
  return localStorage.getItem('admin_token')
}

export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Login failed' }))
    throw new Error(err.error || 'Login failed')
  }
  const { token } = await res.json()
  localStorage.setItem('admin_token', token)
  return token
}

export function logout() {
  localStorage.removeItem('admin_token')
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

export async function getPortfolio() {
  const res = await fetch(`${API_BASE}/portfolio`)
  if (!res.ok) throw new Error('Failed to fetch portfolio')
  return res.json()
}

export async function updateSection(section: string, data: unknown) {
  const token = getToken()
  if (!token) throw new Error('Not authenticated')

  const res = await fetch(`${API_BASE}/portfolio/${section}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to update' }))
    throw new Error(err.error || 'Failed to update')
  }
  return res.json()
}

export async function submitInquiry(data: {
  name: string
  email: string
  phone?: string
  serviceName: string
  message: string
  budget?: string
  timeline?: string
}) {
  const res = await fetch(`${API_BASE}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to submit' }))
    throw new Error(err.error || 'Failed to submit')
  }
  return res.json()
}

export async function getInquiries() {
  const token = getToken()
  const res = await fetch(`${API_BASE}/inquiries`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  if (!res.ok) throw new Error('Failed to fetch inquiries')
  return res.json()
}

export async function updateInquiry(id: string, data: unknown) {
  const token = getToken()
  if (!token) throw new Error('Not authenticated')
  const res = await fetch(`${API_BASE}/inquiries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update inquiry')
  return res.json()
}

export async function deleteInquiry(id: string) {
  const token = getToken()
  if (!token) throw new Error('Not authenticated')
  const res = await fetch(`${API_BASE}/inquiries/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to delete inquiry')
  return res.json()
}
