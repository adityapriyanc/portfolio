import mongoose, { Schema, Document } from 'mongoose'

export interface IInquiry extends Document {
  name: string
  email: string
  phone?: string
  serviceName: string
  message: string
  budget?: string
  timeline?: string
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'cancelled'
  adminNotes?: string
  createdAt: Date
}

const InquirySchema = new Schema<IInquiry>({
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

export default mongoose.model<IInquiry>('Inquiry', InquirySchema)
