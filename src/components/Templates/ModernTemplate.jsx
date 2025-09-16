import React from 'react';
import { formatDate } from '@/lib/utils';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export const templateMeta = {
  id: 'modern',
  name: 'Modern',
  description: 'Clean, professional design with modern typography',
  thumbnail: '/templates/modern-preview.png',
  category: 'Professional',
};

export default function ModernTemplate({ data, className = '' }) {
  if (!data) return null;

  const { personal, summary, experience, education, skills, projects, certifications, languages, socialLinks } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white shadow-lg ${className}`}>
      {/* Header Section */}
      <div className="bg-slate-900 text-white px-8 py-6">
        <div className="flex items-start gap-6">
          {personal?.photo && (
            <div className="flex-shrink-0">
              <img
                src={personal.photo}
                alt={`${personal.firstName} ${personal.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {personal?.firstName} {personal?.lastName}
            </h1>
            {personal?.title && (
              <h2 className="text-xl text-slate-300 mb-4">{personal.title}</h2>
            )}
            
            {/* Contact Information */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              {personal?.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal?.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal?.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal?.website && (
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>{personal.website}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            {socialLinks?.length > 0 && (
              <div className="flex gap-4 mt-3">
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-1 text-sm text-slate-300">
                    {link.platform.toLowerCase().includes('linkedin') && <Linkedin className="w-4 h-4" />}
                    {link.platform.toLowerCase().includes('github') && <Github className="w-4 h-4" />}
                    <span>{link.platform}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Summary Section */}
        {summary && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 border-b-2 border-slate-900 pb-1 mb-4">
              Professional Summary
            </h3>
            <p className="text-slate-700 leading-relaxed wrap-anywhere ">{summary}</p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2 space-y-8">
            {/* Experience Section */}
            {experience?.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-slate-900 border-b-2 border-slate-900 pb-1 mb-4">
                  Professional Experience
                </h3>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-slate-900">{exp.position}</h4>
                          <p className="text-slate-700 font-medium">{exp.company}</p>
                          {exp.location && <p className="text-sm text-slate-600">{exp.location}</p>}
                        </div>
                        <div className="text-sm text-slate-600 text-right">
                          <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-slate-700 text-sm leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects Section */}
            {projects?.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-slate-900 border-b-2 border-slate-900 pb-1 mb-4">
                  Projects
                </h3>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-slate-900">{project.name}</h4>
                        {project.url && (
                          <a href={project.url} className="text-sm text-blue-600 hover:underline">
                            View Project
                          </a>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-slate-700 text-sm mb-2">{project.description}</p>
                      )}
                      {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills Section */}
            {skills?.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-slate-900 border-b-2 border-slate-900 pb-1 mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-900 text-white text-sm rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education?.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-slate-900 border-b-2 border-slate-900 pb-1 mb-4">
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-slate-900 text-sm">{edu.degree}</h4>
                      <p className="text-slate-700 text-sm">{edu.institution}</p>
                      {edu.field && <p className="text-slate-600 text-sm">{edu.field}</p>}
                      <p className="text-slate-600 text-xs">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </p>
                      {edu.gpa && <p className="text-slate-600 text-xs">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications Section */}
            {certifications?.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-slate-900 border-b-2 border-slate-900 pb-1 mb-4">
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-slate-900 text-sm">{cert.name}</h4>
                      <p className="text-slate-700 text-sm">{cert.issuer}</p>
                      {cert.date && <p className="text-slate-600 text-xs">{formatDate(cert.date)}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages Section */}
            {languages?.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-slate-900 border-b-2 border-slate-900 pb-1 mb-4">
                  Languages
                </h3>
                <div className="space-y-2">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-slate-700 text-sm">{lang.name}</span>
                      <span className="text-slate-600 text-sm">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ModernTemplate.templateMeta = templateMeta;