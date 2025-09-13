import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { experienceSchema } from '@/lib/validations';
import useResumeStore from '@/lib/store/resumeStore';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar,
  MapPin,
  Building
} from 'lucide-react';

export default function ExperienceStep() {
  const { 
    resumeData, 
    addExperience, 
    updateExperience, 
    removeExperience, 
    nextStep, 
    prevStep 
  } = useResumeStore();
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const form = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: '',
    },
  });

  const watchCurrent = form.watch('current');

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      updateExperience(editingIndex, data);
      setEditingIndex(null);
    } else {
      addExperience(data);
      setIsAddingNew(false);
    }
    form.reset();
  };

  const handleEdit = (index) => {
    const experience = resumeData.experience[index];
    form.reset(experience);
    setEditingIndex(index);
    setIsAddingNew(true);
  };

  const handleCancel = () => {
    form.reset();
    setEditingIndex(null);
    setIsAddingNew(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Work Experience
          </CardTitle>
          <CardDescription>
            Add your work experience in reverse chronological order (most recent first).
            Include relevant achievements and quantifiable results.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Existing Experience List */}
          {resumeData.experience?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Experience</h3>
              {resumeData.experience.map((exp, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">{exp.position}</h4>
                        <Badge variant="secondary">{exp.current ? 'Current' : 'Past'}</Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        
                        {exp.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                      </div>
                      
                      {exp.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(index)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              
              <Separator />
            </div>
          )}

          {/* Add/Edit Form */}
          {(isAddingNew || resumeData.experience?.length === 0) && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {editingIndex !== null ? 'Edit Experience' : 'Add New Experience'}
                </h3>

                {/* Company and Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Apple Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Senior Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            disabled={watchCurrent}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Current Position Checkbox */}
                <FormField
                  control={form.control}
                  name="current"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I currently work here</FormLabel>
                        <FormDescription>
                          Check this if this is your current position
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Job Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your responsibilities, achievements, and impact. Use bullet points or paragraphs. Include quantifiable results when possible."
                          className="min-h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Focus on achievements and results. Use action verbs and quantify your impact.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <Button type="submit">
                    {editingIndex !== null ? 'Update Experience' : 'Add Experience'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* Add New Button */}
          {!isAddingNew && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddingNew(true)}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          )}

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