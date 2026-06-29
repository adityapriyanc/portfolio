import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import contactRoutes from '../server/src/routes/contact.js'
import authRoutes from '../server/src/routes/auth.js'
import portfolioRoutes from '../server/src/routes/portfolio.js'
import servicesRoutes from '../server/src/routes/services.js'
import inquiriesRoutes from '../server/src/routes/inquiries.js'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'

let cachedDb: typeof mongoose | null = null

async function connectDB() {
  if (cachedDb) return cachedDb
  try {
    cachedDb = await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    throw err
  }
  return cachedDb
}

connectDB().catch(err => {
  console.error('MongoDB connection failed, continuing without DB:', err.message)
})

const app = express()

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

export default app
