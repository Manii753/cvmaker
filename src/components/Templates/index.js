// This file dynamically loads all templates from the Templates directory
// When you add a new template component, it will automatically be available

import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
//import CreativeTemplate from './CreativeTemplate';

// Template registry - add new templates here
const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  //creative: CreativeTemplate,
};

// Get all available templates with their metadata
export function getAvailableTemplates() {
  return Object.entries(templates).map(([id, TemplateComponent]) => ({
    id,
    component: TemplateComponent,
    ...TemplateComponent.templateMeta,
  }));
}

// Get a specific template by ID
export function getTemplate(templateId) {
  return templates[templateId] || templates.modern;
}

// Get template metadata
export function getTemplateMeta(templateId) {
  const template = templates[templateId];
  return template?.templateMeta || templates.modern.templateMeta;
}

// Export all templates for direct import
export {
  ModernTemplate,
  ClassicTemplate,
  //CreativeTemplate,
};

export default templates;