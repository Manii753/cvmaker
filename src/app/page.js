import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Palette, 
  Download, 
  Zap, 
  Shield, 
  Users,
  ArrowRight,
  CheckCircle2,
  Star
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: FileText,
      title: 'Step-by-Step Builder',
      description: 'Guided process to create your perfect resume with easy-to-follow steps.'
    },
    {
      icon: Palette,
      title: 'Multiple Templates',
      description: 'Choose from professional templates designed for different industries.'
    },
    {
      icon: Download,
      title: 'PDF Export',
      description: 'Download your resume as a high-quality PDF ready for applications.'
    },
    {
      icon: Zap,
      title: 'Live Preview',
      description: 'See your resume update in real-time as you make changes.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely. Only you can access it.'
    },
    {
      icon: Users,
      title: 'HR Approved',
      description: 'Templates designed by HR professionals to pass applicant tracking systems.'
    }
  ];

  const templates = [
    {
      name: 'Modern',
      description: 'Clean, contemporary design perfect for tech and creative roles',
      category: 'Professional'
    },
    {
      name: 'Classic',
      description: 'Traditional format ideal for conservative industries',
      category: 'Traditional'
    },
    {
      name: 'Creative',
      description: 'Bold, colorful design for creative professionals',
      category: 'Creative'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      content: 'Got my dream job at Google using this resume builder. The templates are fantastic!',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Marketing Manager',
      content: 'Super easy to use and the live preview helped me perfect my resume in minutes.',
      rating: 5
    },
    {
      name: 'Elena Rodriguez',
      role: 'Designer',
      content: 'The creative template perfectly showcased my design skills. Highly recommend!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">CV Builder</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="api/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="api/auth/signin">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Build Your Perfect Resume in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Create a professional resume that stands out with our easy-to-use builder. 
              Choose from multiple templates, get live preview, and export to PDF.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="api/auth/signin">
                <Button size="lg" className="text-lg px-8 py-3">
                  Start Building Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Templates
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Professional Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>PDF Export</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground">
              Powerful features to create the perfect resume for any job application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Professional Resume Templates</h2>
            <p className="text-xl text-muted-foreground">
              Choose from carefully designed templates that help you stand out
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-16 h-16 mx-auto text-primary mb-4" />
                    <h3 className="text-xl font-semibold">{template.name} Template</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                  <p className="text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Thousands of professionals have landed their dream jobs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Resume?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of professionals who have successfully created their perfect resume
            </p>
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Building Now - It's Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">CV Builder</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 CV Builder. All rights reserved. Built with Next.js and love.
          </p>
        </div>
      </footer>
    </div>
  );
}