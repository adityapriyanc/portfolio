export const personalInfo = {
  name: 'Aditya Priyan C',
  tagline: 'CSE Student & Programmer',
  description:
    'I am a computer science student specializing in constructing responsive, modern web applications and exploring AI integrations. Welcome to my personal space!',
  bio: `I am a BTech Computer Science and Engineering student at Vellore Institute of Technology (VIT). I have a strong interest in programming, software development, and logical problem-solving. I am always eager to learn new technologies and apply my computer science knowledge to solve real-world problems.`,
  email: 'viiiaadityapriyan@gmail.com',
  location: 'Chennai, India',
  education: 'B.Tech CSE, VIT Vellore',
  social: {
    linkedin: 'https://www.linkedin.com/in/aditya-priyan-c-911b103b1/',
    github: 'https://github.com/adityapriyan',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
  },
  resumeUrl: '/resume.pdf',
}

export const typingStrings = [
  'Web Developer',
  'AI Enthusiast',
  'Problem Solver',
]

export const skills = [
  { name: 'C', level: 80, category: 'backend' },
  { name: 'C++', level: 80, category: 'backend' },
  { name: 'Java', level: 60, category: 'backend' },
  { name: 'Python', level: 60, category: 'backend' },
]

export const skillBadges = [
  { name: 'Python', icon: 'python' },
  { name: 'C', icon: 'code' },
  { name: 'C++', icon: 'code' },
  { name: 'Java', icon: 'code' },
  { name: 'Problem Solving', icon: 'brain' },
  { name: 'Algorithms', icon: 'code' },
]

export const projects = [
  {
    title: 'Climate-Based Cement Composition Analysis',
    description:
      'Developed a project to determine suitable cement composition for different regions based on climate conditions. Focusing on data-based decision making.',
    tech: ['Python', 'Data Analysis'],
    lessons: [
      'Applying data analysis to real-world material science problems',
      'Working with climate datasets and regional variation patterns',
      'Translating technical findings into actionable recommendations',
    ],
    image: '/cement-project.webp',
    github: '',
    live: '',
  },
]

export const currentlyBuilding = {
  title: 'Project K',
  subtitle: 'VIT Grade Tracker',
  description:
    'A web app that helps VIT students gain better insights into their marks, grades, and academic predictions. The goal is to help students boost their preparation by understanding where they stand and what to focus on.',
  features: [
    'Track internal marks and calculate predicted grades',
    'Visualize performance trends across subjects',
    'Get personalized recommendations to improve preparation',
  ],
  tech: ['React', 'Node.js', 'PostgreSQL'],
}
