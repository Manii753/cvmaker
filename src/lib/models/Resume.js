import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  meta: {
    title: {
      type: String,
      default: 'Untitled Resume',
    },
    templateId: {
      type: String,
      default: 'modern',
    },
    palette: {
      type: String,
      default: 'blue',
    },
  },
  personal: {
    firstName: String,
    lastName: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    website: String,
    photo: String,
  },
  summary: String,
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    current: {
      type: Boolean,
      default: false,
    },
    description: String,
    location: String,
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    current: {
      type: Boolean,
      default: false,
    },
    gpa: String,
    description: String,
  }],
  skills: [String],
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    url: String,
    startDate: String,
    endDate: String,
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    url: String,
  }],
  languages: [{
    name: String,
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Native'],
    },
  }],
  socialLinks: [{
    platform: String,
    url: String,
  }],
  customSections: [{
    title: String,
    items: [String],
  }],
}, {
  timestamps: true,
});

// Index for faster queries
ResumeSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);