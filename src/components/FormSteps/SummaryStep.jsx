import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Lightbulb } from 'lucide-react';

const summarySchema = z.object({
  summary: z.string().optional(),
});

export default function SummaryStep() {
  const { resumeData, updateResumeField, nextStep, prevStep } = useResumeStore();
  
  const form = useForm({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || '',
    },
  });

  const onSubmit = (data) => {
    updateResumeField('summary', data.summary);
    nextStep();
  };

  const summaryTips = [
    "Keep it concise - 2-4 sentences maximum",
    "Highlight your key strengths and achievements",
    "Tailor it to the job you're applying for",
    "Use action words and quantifiable results",
    "Avoid generic phrases like 'hard-working' or 'team player'",
  ];

  const examples = [
    "Experienced software engineer with 5+ years developing scalable web applications. Led a team of 8 developers to deliver projects 20% ahead of schedule. Specialized in React, Node.js, and cloud architecture.",
    "Creative marketing manager with proven track record of increasing brand awareness by 150%. Expert in digital marketing campaigns, social media strategy, and data-driven decision making.",
    "Detail-oriented accountant with CPA certification and 7 years of experience in financial analysis. Reduced processing time by 30% through process automation and improved accuracy to 99.8%.",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Professional Summary
          </CardTitle>
          <CardDescription>
            Write a brief overview of your professional background, key skills, and career objectives.
            This is often the first thing recruiters read, so make it count!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a compelling professional summary that highlights your experience, skills, and what makes you unique..."
                        className="min-h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Character count: {field.value?.length || 0}/500 (recommended: 200-400 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button type="submit" className="min-w-32">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Tips and Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5" />
              Writing Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {summaryTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examples.map((example, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground italic">
                    "{example}"
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}