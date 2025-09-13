import { z } from 'zod';

// Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  title: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid URL').or(z.string().length(0)).optional(),
  photo: z.string().optional(),
});

// Work Experience Schema
export const experienceSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  location: z.string().optional(),
});

// Education Schema
export const educationSchema = z.object({
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  gpa: z.string().optional(),
  description: z.string().optional(),
});

// Project Schema
export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  url: z.string().url('Invalid URL').or(z.string().length(0)).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// Certification Schema
export const certificationSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().optional(),
  url: z.string().url('Invalid URL').or(z.string().length(0)).optional(),
});

// Language Schema
export const languageSchema = z.object({
  name: z.string().min(1, 'Language name is required'),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Native']),
});

// Social Link Schema
export const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL'),
});

// Custom Section Schema
export const customSectionSchema = z.object({
  title: z.string().min(1, 'Section title is required'),
  items: z.array(z.string()).default([]),
});

// Complete Resume Schema
export const resumeSchema = z.object({
  meta: z.object({
    title: z.string().min(1, 'Resume title is required'),
    templateId: z.string().default('modern'),
    palette: z.string().default('blue'),
  }),
  personal: personalInfoSchema,
  summary: z.string().optional(),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(z.string()).default([]),
  projects: z.array(projectSchema).default([]),
  certifications: z.array(certificationSchema).default([]),
  languages: z.array(languageSchema).default([]),
  socialLinks: z.array(socialLinkSchema).default([]),
  customSections: z.array(customSectionSchema).default([]),
});

// Form step schemas for multi-step validation
export const stepSchemas = {
  personal: personalInfoSchema,
  summary: z.object({
    summary: z.string().optional(),
  }),
  experience: z.object({
    experience: z.array(experienceSchema).default([]),
  }),
  education: z.object({
    education: z.array(educationSchema).default([]),
  }),
  skills: z.object({
    skills: z.array(z.string()).default([]),
  }),
  projects: z.object({
    projects: z.array(projectSchema).default([]),
  }),
  certifications: z.object({
    certifications: z.array(certificationSchema).default([]),
  }),
  languages: z.object({
    languages: z.array(languageSchema).default([]),
  }),
  socialLinks: z.object({
    socialLinks: z.array(socialLinkSchema).default([]),
  }),
  customSections: z.object({
    customSections: z.array(customSectionSchema).default([]),
  }),
};