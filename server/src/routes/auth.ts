import { Router, Request, Response } from 'express'
import { generateToken } from '../middleware/auth.js'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body
  const adminUser = process.env.ADMIN_USER || 'admin'
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123'

  if (username === adminUser && password === adminPass) {
    const token = generateToken(username)
    res.json({ token })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

export default router
