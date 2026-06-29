import { Router, Response } from 'express'
import Portfolio from '../models/Portfolio.js'

const router = Router()

router.get('/', async (_req, res: Response) => {
  try {
    const portfolio = await Portfolio.findOne()
    res.json(portfolio?.services || [])
  } catch {
    res.status(500).json({ error: 'Failed to fetch services' })
  }
})

export default router
