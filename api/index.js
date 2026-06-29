module.exports = function handler(req, res) {
  const path = req.url?.split('?')[0] ?? ''

  if (path === '/api/health') {
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
  }

  res.status(404).json({ error: 'Not found' })
}
