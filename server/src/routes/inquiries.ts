import { Router, Request, Response } from 'express'
import nodemailer from 'nodemailer'
import Inquiry from '../models/Inquiry.js'
import { authMiddleware, AuthRequest } from '../middleware/auth.js'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const inquiry = await Inquiry.create(req.body)

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `Service Inquiry: ${req.body.serviceName || 'General'}`,
      html: `
        <h3>New service inquiry from your portfolio</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone || 'N/A'}</p>
        <p><strong>Service:</strong> ${req.body.serviceName || 'N/A'}</p>
        <p><strong>Budget:</strong> ${req.body.budget || 'N/A'}</p>
        <p><strong>Timeline:</strong> ${req.body.timeline || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${req.body.message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)

    res.status(201).json({ success: true, data: inquiry })
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to submit inquiry' })
  }
})

router.get('/', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 })
    res.json(inquiries)
  } catch {
    res.status(500).json({ error: 'Failed to fetch inquiries' })
  }
})

router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, data: inquiry })
  } catch {
    res.status(500).json({ error: 'Failed to update inquiry' })
  }
})

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: 'Failed to delete inquiry' })
  }
})

export default router
