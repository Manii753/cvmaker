import React, { useState } from 'react';
import useResumeStore from '@/lib/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Zap, 
  Plus, 
  X, 
  Code, 
  Palette, 
  Users, 
  TrendingUp,
  Languages,
  Wrench
} from 'lucide-react';

export default function SkillsStep() {
  const { 
    resumeData, 
    addSkill, 
    removeSkill, 
    nextStep, 
    prevStep 
  } = useResumeStore();
  
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !resumeData.skills?.includes(newSkill.trim())) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const skillCategories = {
    technical: {
      icon: Code,
      title: 'Technical Skills',
      suggestions: [
        'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 
        'Docker', 'Git', 'MongoDB', 'TypeScript', 'Java', 'C++',
        'HTML/CSS', 'REST APIs', 'GraphQL', 'Kubernetes', 'Linux'
      ]
    },
    design: {
      icon: Palette,
      title: 'Design Skills',
      suggestions: [
        'Adobe Photoshop', 'Figma', 'Sketch', 'Adobe Illustrator',
        'UI/UX Design', 'Wireframing', 'Prototyping', 'Adobe XD',
        'InDesign', 'Canva', 'After Effects', 'Blender'
      ]
    },
    soft: {
      icon: Users,
      title: 'Soft Skills',
      suggestions: [
        'Leadership', 'Communication', 'Project Management', 'Team Collaboration',
        'Problem Solving', 'Critical Thinking', 'Time Management', 'Adaptability',
        'Public Speaking', 'Mentoring', 'Negotiation', 'Customer Service'
      ]
    },
    business: {
      icon: TrendingUp,
      title: 'Business Skills',
      suggestions: [
        'Data Analysis', 'Strategic Planning', 'Market Research', 'SEO',
        'Digital Marketing', 'Sales', 'Budgeting', 'Risk Management',
        'Process Improvement', 'Agile/Scrum', 'Business Intelligence'
      ]
    },
    languages: {
      icon: Languages,
      title: 'Programming Languages',
      suggestions: [
        'JavaScript', 'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go',
        'Swift', 'Kotlin', 'Rust', 'TypeScript', 'C++', 'Scala'
      ]
    },
    tools: {
      icon: Wrench,
      title: 'Tools & Platforms',
      suggestions: [
        'Microsoft Office', 'Google Workspace', 'Slack', 'Jira', 'Trello',
        'Salesforce', 'HubSpot', 'WordPress', 'Shopify', 'Tableau',
        'Power BI', 'Jenkins', 'GitHub', 'VS Code'
      ]
    }
  };

  const addSuggestedSkill = (skill) => {
    if (!resumeData.skills?.includes(skill)) {
      addSkill(skill);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Skills
          </CardTitle>
          <CardDescription>
            Add your technical and soft skills. Include both hard skills (specific tools/technologies) 
            and soft skills (communication, leadership, etc.).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Skills */}
          {resumeData.skills?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Your Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-sm px-3 py-1 flex items-center gap-2"
                  >
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeSkill(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Add New Skill */}
          <div className="space-y-3">
            <Label htmlFor="skill-input">Add a New Skill</Label>
            <div className="flex gap-2">
              <Input
                id="skill-input"
                placeholder="Type a skill and press Enter or click Add"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleAddSkill}
                disabled={!newSkill.trim()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Skill Suggestions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Skill Suggestions</h3>
            <p className="text-sm text-muted-foreground">
              Click on any skill below to add it to your list:
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Object.entries(skillCategories).map(([key, category]) => {
                const IconComponent = category.icon;
                return (
                  <Card key={key} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <IconComponent className="w-4 h-4" />
                      <h4 className="font-medium">{category.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.suggestions.map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => addSuggestedSkill(skill)}
                          disabled={resumeData.skills?.includes(skill)}
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Tips */}
          <Card className="p-4 bg-muted/50">
            <h4 className="font-medium mb-2">💡 Tips for Adding Skills</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Include both technical skills and soft skills</li>
              <li>• Be specific (e.g., "React.js" instead of just "JavaScript frameworks")</li>
              <li>• Only include skills you're comfortable discussing in an interview</li>
              <li>• Prioritize skills relevant to your target job</li>
              <li>• Consider grouping similar skills (e.g., "Adobe Creative Suite")</li>
            </ul>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button type="button" onClick={nextStep}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}