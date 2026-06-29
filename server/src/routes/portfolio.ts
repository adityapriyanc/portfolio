import { Router, Response } from 'express'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'
import Portfolio from '../models/Portfolio.js'

const router = Router()

const seedData = {
  "personalInfo": {
    "name": "Aditya Priyan C",
    "tagline": "CSE Student & Programmer",
    "description": "I am a computer science student specializing in constructing responsive, modern web applications and exploring AI integrations. Welcome to my personal space!",
    "bio": "I am a BTech Computer Science and Engineering student at Vellore Institute of Technology (VIT). I have a strong interest in programming, software development, and logical problem-solving. I am always eager to learn new technologies and apply my computer science knowledge to solve real-world problems.",
    "email": "viiiaadityapriyan@gmail.com",
    "location": "Chennai, India",
    "education": "B.Tech CSE, VIT Vellore",
    "social": {
      "linkedin": "https://www.linkedin.com/in/aditya-priyan-c-911b103b1/",
      "github": "https://github.com/adityapriyan",
      "facebook": "https://facebook.com",
      "twitter": "https://twitter.com",
      "instagram": "https://www.instagram.com/adi_prxc/"
    }
  },
  "typingStrings": ["Web Developer", "AI Enthusiast", "Problem Solver"],
  "skills": [
    { "name": "C", "level": 80, "category": "backend" },
    { "name": "C++", "level": 80, "category": "backend" },
    { "name": "Java", "level": 60, "category": "backend" },
    { "name": "Python", "level": 60, "category": "backend" }
  ],
  "skillBadges": [
    { "name": "Python", "icon": "python" },
    { "name": "C", "icon": "code" },
    { "name": "C++", "icon": "code" },
    { "name": "Java", "icon": "code" },
    { "name": "Problem Solving", "icon": "brain" },
    { "name": "Algorithms", "icon": "code" }
  ],
  "projects": [
    {
      "title": "Climate-Based Cement Composition Analysis",
      "description": "Developed a project to determine suitable cement composition for different regions based on climate conditions. Focusing on data-based decision making.",
      "tech": ["Python", "Data Analysis"],
      "lessons": [
        "Applying data analysis to real-world material science problems",
        "Working with climate datasets and regional variation patterns",
        "Translating technical findings into actionable recommendations"
      ],
      "image": "/cement-project.webp",
      "github": "",
      "live": ""
    }
  ],
  "services": [
    {
      "title": "Web Development",
      "description": "Building responsive, modern web applications using React, Node.js, and Tailwind CSS with clean architecture.",
      "icon": "\uD83C\uDF10",
      "features": [
        "Responsive single-page & multi-page applications",
        "RESTful API design and integration",
        "Full-stack development (React + Node.js)",
        "Performance optimization & SEO"
      ]
    },
    {
      "title": "AI Integration",
      "description": "Integrating AI/ML capabilities into web applications for smarter, data-driven user experiences.",
      "icon": "\uD83E\uDD16",
      "features": [
        "Chatbot & virtual assistant integration",
        "AI-powered search & recommendations",
        "Data analysis & visualization dashboards",
        "LLM API integration (OpenAI, etc.)"
      ]
    },
    {
      "title": "UI/UX Design",
      "description": "Designing intuitive, accessible user interfaces with a focus on usability, aesthetics, and brand consistency.",
      "icon": "\uD83C\uDFA8",
      "features": [
        "Wireframing & prototyping (Figma)",
        "Design system & component libraries",
        "Accessibility-first design",
        "Responsive & mobile-first layouts"
      ]
    },
    {
      "title": "Consulting & Code Review",
      "description": "Providing technical consulting, code audits, and architecture reviews for ongoing or new projects.",
      "icon": "\uD83D\uDCA1",
      "features": [
        "Code quality & best practice audits",
        "Architecture & tech stack recommendations",
        "Performance & scalability reviews",
        "Mentoring & pair programming sessions"
      ]
    }
  ],
  "currentlyBuilding": {
    "title": "Project K",
    "subtitle": "VIT Grade Tracker",
    "description": "A web app that helps VIT students gain better insights into their marks, grades, and academic predictions.",
    "features": [
      "Track internal marks and calculate predicted grades",
      "Visualize performance trends across subjects",
      "Get personalized recommendations to improve preparation"
    ],
    "tech": ["React", "Node.js", "PostgreSQL"]
  },
  "footer": { "text": "\u00a9 {year} Aditya Priyan C. All Rights Reserved." }
}

router.get('/', async (_req, res: Response) => {
  try {
    let data = await Portfolio.findOne()
    if (!data) {
      data = await Portfolio.create(seedData)
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
      portfolio = await Portfolio.create(seedData)
    }

    ;(portfolio as any)[section] = req.body
    await portfolio.save()

    res.json({ success: true, data: (portfolio as any)[section] })
  } catch {
    res.status(500).json({ error: 'Failed to save data' })
  }
})

export default router
