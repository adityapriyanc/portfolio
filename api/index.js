const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio'
const JWT_SECRET = process.env.JWT_SECRET || 'portfolio-admin-secret-change-me'

let cachedDb = null
let connectionError = null
let uriPreview = ''
async function connectDB() {
  if (cachedDb) return cachedDb
  try {
    uriPreview = (MONGODB_URI || '').slice(0, 50)
    cachedDb = await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
    connectionError = null
  } catch (err) {
    connectionError = err.message
    console.error('MongoDB connection error:', err)
  }
  return cachedDb
}
connectDB()

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// --- Health ---
app.get('/api/health', async (_req, res) => {
  const mongoState = ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown'
  res.json({ status: 'ok', mongoState, mongoError: connectionError, uriPreview, timestamp: new Date().toISOString() })
})

// --- Auth ---
function generateToken(username) {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' })
}

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body
  const adminUser = process.env.ADMIN_USER || 'admin'
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123'
  if (username === adminUser && password === adminPass) {
    const token = generateToken(username)
    return res.json({ token })
  }
  res.status(401).json({ error: 'Invalid credentials' })
})

// Auth middleware
function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    req.admin = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// --- Mongoose Models ---
const PortfolioSchema = new mongoose.Schema({
  personalInfo: {
    name: String, tagline: String, description: String, bio: String,
    email: String, location: String, education: String,
    social: { type: Map, of: String },
  },
  typingStrings: [String],
  skills: [{ name: String, level: Number, category: String }],
  skillBadges: [{ name: String, icon: String }],
  projects: [{ title: String, description: String, tech: [String], lessons: [String], image: String, github: String, live: String }],
  currentlyBuilding: { title: String, subtitle: String, description: String, features: [String], tech: [String] },
  services: [{ title: String, description: String, icon: String, features: [String], price: String }],
  footer: { text: String },
})
const Portfolio = mongoose.model('Portfolio', PortfolioSchema)

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  serviceName: { type: String, required: true },
  message: { type: String, required: true },
  budget: String,
  timeline: String,
  status: { type: String, default: 'new' },
  adminNotes: String,
  createdAt: { type: Date, default: Date.now },
})
const Inquiry = mongoose.model('Inquiry', InquirySchema)

// --- Seed Data ---
const seedData = {
  personalInfo: {
    name: "Aditya Priyan C",
    tagline: "CSE Student & Programmer",
    description: "I am a computer science student specializing in constructing responsive, modern web applications and exploring AI integrations. Welcome to my personal space!",
    bio: "I am a BTech Computer Science and Engineering student at VIT. I have a strong interest in programming, software development, and logical problem-solving.",
    email: "viiiaadityapriyan@gmail.com",
    location: "Chennai, India",
    education: "B.Tech CSE, VIT Vellore",
    social: { linkedin: "https://www.linkedin.com/in/aditya-priyan-c-911b103b1/", github: "https://github.com/adityapriyan", facebook: "https://facebook.com", twitter: "https://twitter.com", instagram: "https://www.instagram.com/adi_prxc/" }
  },
  typingStrings: ["Web Developer", "AI Enthusiast", "Problem Solver"],
  skills: [
    { name: "C", level: 80, category: "backend" },
    { name: "C++", level: 80, category: "backend" },
    { name: "Java", level: 60, category: "backend" },
    { name: "Python", level: 60, category: "backend" }
  ],
  skillBadges: [
    { name: "Python", icon: "python" }, { name: "C", icon: "code" },
    { name: "C++", icon: "code" }, { name: "Java", icon: "code" },
    { name: "Problem Solving", icon: "brain" }, { name: "Algorithms", icon: "code" }
  ],
  projects: [{
    title: "Climate-Based Cement Composition Analysis",
    description: "Developed a project to determine suitable cement composition for different regions based on climate conditions.",
    tech: ["Python", "Data Analysis"],
    lessons: ["Applying data analysis to real-world material science problems", "Working with climate datasets and regional variation patterns", "Translating technical findings into actionable recommendations"],
    image: "/cement-project.webp", github: "", live: ""
  }],
  services: [
    { title: "Web Development", description: "Building responsive, modern web applications using React, Node.js, and Tailwind CSS with clean architecture.", icon: "\uD83C\uDF10", features: ["Responsive single-page & multi-page applications", "RESTful API design and integration", "Full-stack development (React + Node.js)", "Performance optimization & SEO"] },
    { title: "AI Integration", description: "Integrating AI/ML capabilities into web applications for smarter, data-driven user experiences.", icon: "\uD83E\uDD16", features: ["Chatbot & virtual assistant integration", "AI-powered search & recommendations", "Data analysis & visualization dashboards", "LLM API integration (OpenAI, etc.)"] },
    { title: "UI/UX Design", description: "Designing intuitive, accessible user interfaces with a focus on usability, aesthetics, and brand consistency.", icon: "\uD83C\uDFA8", features: ["Wireframing & prototyping (Figma)", "Design system & component libraries", "Accessibility-first design", "Responsive & mobile-first layouts"] },
    { title: "Consulting & Code Review", description: "Providing technical consulting, code audits, and architecture reviews for ongoing or new projects.", icon: "\uD83D\uDCA1", features: ["Code quality & best practice audits", "Architecture & tech stack recommendations", "Performance & scalability reviews", "Mentoring & pair programming sessions"] }
  ],
  currentlyBuilding: { title: "Project K", subtitle: "VIT Grade Tracker", description: "A web app that helps VIT students gain better insights into their marks, grades, and academic predictions.", features: ["Track internal marks and calculate predicted grades", "Visualize performance trends across subjects", "Get personalized recommendations to improve preparation"], tech: ["React", "Node.js", "PostgreSQL"] },
  footer: { text: "\u00a9 {year} Aditya Priyan C. All Rights Reserved." }
}

// --- Portfolio Routes ---
app.get('/api/portfolio', async (_req, res) => {
  try {
    await connectDB()
    let data = await Portfolio.findOne()
    if (!data) data = await Portfolio.create(seedData)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data', detail: err.message, name: err.name })
  }
})

app.put('/api/portfolio/:section', authMiddleware, async (req, res) => {
  try {
    const section = req.params.section
    const allowed = ['personalInfo', 'typingStrings', 'skills', 'skillBadges', 'projects', 'currentlyBuilding', 'services', 'footer']
    if (!allowed.includes(section)) {
      return res.status(400).json({ error: `Invalid section: ${section}` })
    }
    let portfolio = await Portfolio.findOne()
    if (!portfolio) portfolio = await Portfolio.create(seedData)
    portfolio[section] = req.body
    await portfolio.save()
    res.json({ success: true, data: portfolio[section] })
  } catch {
    res.status(500).json({ error: 'Failed to save data' })
  }
})

// --- Services route ---
app.get('/api/services', async (_req, res) => {
  try {
    const portfolio = await Portfolio.findOne()
    res.json(portfolio?.services || [])
  } catch {
    res.status(500).json({ error: 'Failed to fetch services' })
  }
})

// --- Contact route ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
})

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact: ${subject || 'No Subject'}`,
      html: `<h3>New message from your portfolio</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject || 'N/A'}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    })
    res.json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Contact error:', error)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

// --- Inquiry routes ---
const inquiryTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
})

app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body)
    await inquiryTransporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Service Inquiry: ${req.body.serviceName || 'General'}`,
      html: `<h3>New service inquiry</h3><p><strong>Name:</strong> ${req.body.name}</p><p><strong>Email:</strong> ${req.body.email}</p><p><strong>Phone:</strong> ${req.body.phone || 'N/A'}</p><p><strong>Service:</strong> ${req.body.serviceName || 'N/A'}</p><p><strong>Budget:</strong> ${req.body.budget || 'N/A'}</p><p><strong>Timeline:</strong> ${req.body.timeline || 'N/A'}</p><p><strong>Message:</strong></p><p>${req.body.message}</p>`,
    })
    res.status(201).json({ success: true, data: inquiry })
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to submit inquiry' })
  }
})

app.get('/api/inquiries', authMiddleware, async (_req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })
    res.json(inquiries)
  } catch {
    res.status(500).json({ error: 'Failed to fetch inquiries' })
  }
})

app.put('/api/inquiries/:id', authMiddleware, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: inquiry })
  } catch {
    res.status(500).json({ error: 'Failed to update inquiry' })
  }
})

app.delete('/api/inquiries/:id', authMiddleware, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete inquiry' })
  }
})

module.exports = app
