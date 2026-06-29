import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import contactRoutes from '../server/src/routes/contact'
import authRoutes from '../server/src/routes/auth'
import portfolioRoutes from '../server/src/routes/portfolio'
import servicesRoutes from '../server/src/routes/services'
import inquiriesRoutes from '../server/src/routes/inquiries'

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

connectDB()

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
