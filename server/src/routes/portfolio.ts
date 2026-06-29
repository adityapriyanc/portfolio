import { Router, Response } from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { authMiddleware, AuthRequest } from '../middleware/auth'
import Portfolio from '../models/Portfolio'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = Router()

function loadSeed() {
  const seedPath = join(__dirname, '..', '..', 'data', 'portfolio.json')
  return JSON.parse(readFileSync(seedPath, 'utf-8'))
}

router.get('/', async (_req, res: Response) => {
  try {
    let data = await Portfolio.findOne()
    if (!data) {
      data = await Portfolio.create(loadSeed())
    }
    res.json(data)
  } catch {
    res.status(500).json({ error: 'Failed to load data' })
  }
})

router.put('/:section', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const section = req.params.section as string
    const allowedSections = ['personalInfo', 'typingStrings', 'skills', 'skillBadges', 'projects', 'currentlyBuilding', 'services', 'footer']
    if (!allowedSections.includes(section)) {
      res.status(400).json({ error: `Invalid section: ${section}` })
      return
    }

    let portfolio = await Portfolio.findOne()
    if (!portfolio) {
      portfolio = await Portfolio.create(loadSeed())
    }

    ;(portfolio as any)[section] = req.body
    await portfolio.save()

    res.json({ success: true, data: (portfolio as any)[section] })
  } catch {
    res.status(500).json({ error: 'Failed to save data' })
  }
})

export default router
