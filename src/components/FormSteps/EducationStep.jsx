import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { educationSchema } from '@/lib/validations';
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
  GraduationCap, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar,
  MapPin,
  School
} from 'lucide-react';

export default function EducationStep() {
  const { 
    resumeData, 
    addEducation, 
    updateEducation, 
    removeEducation, 
    nextStep, 
    prevStep 
  } = useResumeStore();
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const form = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
    },
  });

  const watchCurrent = form.watch('current');

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      updateEducation(editingIndex, data);
      setEditingIndex(null);
    } else {
      addEducation(data);
      setIsAddingNew(false);
    }
    form.reset();
  };

  const handleEdit = (index) => {
    const education = resumeData.education[index];
    form.reset(education);
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
            <GraduationCap className="w-5 h-5" />
            Education
          </CardTitle>
          <CardDescription>
            Add your educational background, including degrees, certifications, and relevant coursework.
            List in reverse chronological order.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Existing Education List */}
          {resumeData.education?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Education</h3>
              {resumeData.education.map((edu, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">{edu.degree}</h4>
                        <Badge variant="secondary">{edu.current ? 'In Progress' : 'Completed'}</Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <School className="w-4 h-4" />
                          <span className="font-medium">{edu.institution}</span>
                        </div>
                        
                        {edu.field && (
                          <div className="flex items-center gap-2">
                            <span>Field of Study: {edu.field}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                          </span>
                        </div>

                        {edu.gpa && (
                          <div className="flex items-center gap-2">
                            <span>GPA: {edu.gpa}</span>
                          </div>
                        )}
                      </div>
                      
                      {edu.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {edu.description}
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
                        onClick={() => removeEducation(index)}
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
          {(isAddingNew || resumeData.education?.length === 0) && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="text-lg font-semibold">
                  {editingIndex !== null ? 'Edit Education' : 'Add New Education'}
                </h3>

                {/* Institution and Degree */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution *</FormLabel>
                        <FormControl>
                          <Input placeholder="Stanford University" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree *</FormLabel>
                        <FormControl>
                          <Input placeholder="Bachelor of Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Field of Study and GPA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="field"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input placeholder="Computer Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gpa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPA (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="3.8" {...field} />
                        </FormControl>
                        <FormDescription>
                          Only include if 3.5 or higher
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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

                {/* Currently Studying Checkbox */}
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
                        <FormLabel>I'm currently studying here</FormLabel>
                        <FormDescription>
                          Check this if you're currently enrolled
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Additional Information */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Relevant coursework, honors, achievements, activities, etc."
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include relevant coursework, honors, dean's list, scholarships, or other achievements.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <Button type="submit">
                    {editingIndex !== null ? 'Update Education' : 'Add Education'}
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
              Add Education
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