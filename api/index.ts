export default function handler(req: any, res: any) {
  const path = req.url?.split('?')[0] ?? ''

  if (path === '/api/health') {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
    return
  }

  res.status(404).json({ error: 'Not found' })
}
