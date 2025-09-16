import { create } from 'zustand';
import debounce from "lodash/debounce";


const defaultResumeData = {
  meta: {
    title: 'Untitled Resume',
    templateId: 'modern',
    palette: 'blue',
  },
  personal: {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    photo: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  socialLinks: [],
  customSections: [],
};

const useResumeStore = create((set, get) => ({
  // State
  resumeData: { ...defaultResumeData },
  currentStep: 0,
  isLoading: false,
  isSaving: false,
  isDirty: false,
  resumeId: null,
  availableTemplates: [],

  // Actions
  setResumeData: (data) => set({ resumeData: data, isDirty: true }),
  
  updateResumeField: (field, value) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      [field]: value,
    },
    isDirty: true,
  })),

  updatePersonalInfo: (personalData) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      personal: {
        ...state.resumeData.personal,
        ...personalData,
      },
    },
    isDirty: true,
  })),

  updateMeta: (metaData) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      meta: {
        ...state.resumeData.meta,
        ...metaData,
      },
    },
    isDirty: true,
  })),

  // Array field operations
  addExperience: (experience) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: [...state.resumeData.experience, { id: Date.now(), ...experience }],
    },
    isDirty: true,
  })),

  updateExperience: (index, experience) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: state.resumeData.experience.map((exp, i) => 
        i === index ? { ...exp, ...experience } : exp
      ),
    },
    isDirty: true,
  })),

  removeExperience: (index) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      experience: state.resumeData.experience.filter((_, i) => i !== index),
    },
    isDirty: true,
  })),

  addEducation: (education) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: [...state.resumeData.education, { id: Date.now(), ...education }],
    },
    isDirty: true,
  })),

  updateEducation: (index, education) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: state.resumeData.education.map((edu, i) => 
        i === index ? { ...edu, ...education } : edu
      ),
    },
    isDirty: true,
  })),

  removeEducation: (index) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      education: state.resumeData.education.filter((_, i) => i !== index),
    },
    isDirty: true,
  })),

  addProject: (project) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      projects: [...state.resumeData.projects, { id: Date.now(), ...project }],
    },
    isDirty: true,
  })),

  updateProject: (index, project) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      projects: state.resumeData.projects.map((proj, i) => 
        i === index ? { ...proj, ...project } : proj
      ),
    },
    isDirty: true,
  })),

  removeProject: (index) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      projects: state.resumeData.projects.filter((_, i) => i !== index),
    },
    isDirty: true,
  })),

  addSkill: (skill) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      skills: [...state.resumeData.skills, skill],
    },
    isDirty: true,
  })),

  removeSkill: (index) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      skills: state.resumeData.skills.filter((_, i) => i !== index),
    },
    isDirty: true,
  })),

  addCertification: (certification) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      certifications: [...state.resumeData.certifications, { id: Date.now(), ...certification }],
    },
    isDirty: true,
  })),

  updateCertification: (index, certification) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      certifications: state.resumeData.certifications.map((cert, i) => 
        i === index ? { ...cert, ...certification } : cert
      ),
    },
    isDirty: true,
  })),

  removeCertification: (index) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      certifications: state.resumeData.certifications.filter((_, i) => i !== index),
    },
    isDirty: true,
  })),

  addLanguage: (language) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      languages: [...state.resumeData.languages, { id: Date.now(), ...language }],
    },
    isDirty: true,
  })),

  updateLanguage: (index, language) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      languages: state.resumeData.languages.map((lang, i) => 
        i === index ? { ...lang, ...language } : lang
      ),
    },
    isDirty: true,
  })),

  removeLanguage: (index) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      languages: state.resumeData.languages.filter((_, i) => i !== index),
    },
    isDirty: true,
  })),

  addSocialLink: (socialLink) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      socialLinks: [...state.resumeData.socialLinks, { id: Date.now(), ...socialLink }],
    },
    isDirty: true,
  })),

  updateSocialLink: (index, socialLink) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      socialLinks: state.resumeData.socialLinks.map((link, i) => 
        i === index ? { ...link, ...socialLink } : link
      ),
    },
    isDirty: true,
  })),

  removeSocialLink: (index) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      socialLinks: state.resumeData.socialLinks.filter((_, i) => i !== index),
    },
    isDirty: true,
  })),

  addCustomSection: (customSection) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      customSections: [...state.resumeData.customSections, { id: Date.now(), ...customSection }],
    },
    isDirty: true,
  })),

  updateCustomSection: (index, customSection) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      customSections: state.resumeData.customSections.map((section, i) => 
        i === index ? { ...section, ...customSection } : section
      ),
    },
    isDirty: true,
  })),

  removeCustomSection: (index) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      customSections: state.resumeData.customSections.filter((_, i) => i !== index),
    },
    isDirty: true,
  })),

  // Navigation
  setCurrentStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, 9) 
  })),
  
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 0) 
  })),

  // Templates
  setAvailableTemplates: (templates) => set({ availableTemplates: templates }),

  // Loading states
  setLoading: (loading) => set({ isLoading: loading }),
  setSaving: (saving) => set({ isSaving: saving }),

  // Resume operations
  loadResume: async (resumeId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/resumes/${resumeId}`);
      if (response.ok) {
        const resume = await response.json();
        set({ 
          resumeData: resume,
          resumeId: resumeId,
          isDirty: false,
          isLoading: false 
        });
      }
    } catch (error) {
      console.error('Failed to load resume:', error);
      set({ isLoading: false });
    }
  },

  saveResume: debounce(async () => {
    const state = get();
    if (!state.isDirty) return;

    set({ isSaving: true });
    try {
      const url = state.resumeId 
        ? `/api/resumes/${state.resumeId}`
        : '/api/resumes';
      
      const method = state.resumeId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state.resumeData),
      });

      if (response.ok) {
        const result = await response.json();
        set({ 
          resumeId: result.id || state.resumeId,
          isDirty: false,
          isSaving: false 
        });
      }
    } catch (error) {
      console.error('Failed to save resume:', error);
      set({ isSaving: false });
    }
  }, 1000),

  // Reset
  resetResume: () => set({
    resumeData: { ...defaultResumeData },
    currentStep: 0,
    resumeId: null,
    isDirty: false,
  }),
}));

export default useResumeStore;