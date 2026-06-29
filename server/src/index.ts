import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db'
import contactRoutes from './routes/contact'
import authRoutes from './routes/auth'
import portfolioRoutes from './routes/portfolio'
import servicesRoutes from './routes/services'
import inquiriesRoutes from './routes/inquiries'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use('/api', contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/inquiries', inquiriesRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
})
