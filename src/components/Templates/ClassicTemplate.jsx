import React from 'react';
import { formatDate } from '@/lib/utils';

export const templateMeta = {
  id: 'classic',
  name: 'Classic',
  description: 'Traditional, formal design suitable for conservative industries',
  thumbnail: '/templates/classic-preview.png',
  category: 'Traditional',
};

export default function ClassicTemplate({ data, className = '' }) {
  if (!data) return null;

  const { personal, summary, experience, education, skills, projects, certifications, languages, socialLinks } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white shadow-lg ${className}`}>
      <div className="px-8 py-6">
        {/* Header Section */}
        <header className="text-center border-b-2 border-gray-800 pb-6 mb-6">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
            {personal?.firstName} {personal?.lastName}
          </h1>
          {personal?.title && (
            <h2 className="text-xl text-gray-700 mb-4 font-serif">{personal.title}</h2>
          )}
          
          {/* Contact Information */}
          <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
            {personal?.email && <span>{personal.email}</span>}
            {personal?.phone && <span>•</span>}
            {personal?.phone && <span>{personal.phone}</span>}
            {personal?.location && <span>•</span>}
            {personal?.location && <span>{personal.location}</span>}
            {personal?.website && <span>•</span>}
            {personal?.website && <span>{personal.website}</span>}
          </div>

          {/* Social Links */}
          {socialLinks?.length > 0 && (
            <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
              {socialLinks.map((link, index) => (
                <span key={index}>{link.platform}: {link.url}</span>
              ))}
            </div>
          )}
        </header>

        {/* Summary Section */}
        {summary && (
          <section className="mb-6">
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Professional Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="font-semibold text-gray-800">{exp.company}</p>
                    {exp.location && <span className="text-sm text-gray-600">{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed text-justify">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Education
            </h3>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                      <p className="text-gray-800">{edu.institution}</p>
                      {edu.field && <p className="text-gray-700 text-sm">{edu.field}</p>}
                      {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm text-gray-600">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Skills
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {skills.join(' • ')}
            </p>
          </section>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Notable Projects
            </h3>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-gray-900">{project.name}</h4>
                    {project.url && (
                      <span className="text-sm text-blue-600">{project.url}</span>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-700 text-sm leading-relaxed text-justify mb-1">
                      {project.description}
                    </p>
                  )}
                  {project.technologies?.length > 0 && (
                    <p className="text-gray-600 text-sm">
                      <strong>Technologies:</strong> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {certifications?.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Certifications
            </h3>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-baseline">
                  <div>
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    <p className="text-gray-700 text-sm">{cert.issuer}</p>
                  </div>
                  {cert.date && (
                    <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages Section */}
        {languages?.length > 0 && (
          <section>
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Languages
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-700">{lang.name}</span>
                  <span className="text-gray-600 text-sm">({lang.level})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

ClassicTemplate.templateMeta = templateMeta;