import mongoose, { Schema, Document } from 'mongoose'

interface IPersonalInfo {
  name: string
  tagline: string
  description: string
  bio: string
  email: string
  location: string
  education: string
  social: Record<string, string>
}

interface IProject {
  title: string
  description: string
  tech: string[]
  lessons?: string[]
  image?: string
  github?: string
  live?: string
}

interface ICurrentlyBuilding {
  title: string
  subtitle: string
  description: string
  features: string[]
  tech: string[]
}

interface IService {
  title: string
  description: string
  icon: string
  features: string[]
  price?: string
}

export interface IPortfolio extends Document {
  personalInfo: IPersonalInfo
  typingStrings: string[]
  skills: { name: string; level: number; category: string }[]
  skillBadges: { name: string; icon: string }[]
  projects: IProject[]
  currentlyBuilding: ICurrentlyBuilding
  services: IService[]
  footer: { text: string }
}

const PortfolioSchema = new Schema<IPortfolio>({
  personalInfo: {
    name: String,
    tagline: String,
    description: String,
    bio: String,
    email: String,
    location: String,
    education: String,
    social: { type: Map, of: String },
  },
  typingStrings: [String],
  skills: [{ name: String, level: Number, category: String }],
  skillBadges: [{ name: String, icon: String }],
  projects: [{
    title: String,
    description: String,
    tech: [String],
    lessons: [String],
    image: String,
    github: String,
    live: String,
  }],
  currentlyBuilding: {
    title: String,
    subtitle: String,
    description: String,
    features: [String],
    tech: [String],
  },
  services: [{
    title: String,
    description: String,
    icon: String,
    features: [String],
    price: String,
  }],
  footer: {
    text: String,
  },
})

export default mongoose.model<IPortfolio>('Portfolio', PortfolioSchema)
