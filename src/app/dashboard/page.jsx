'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  Eye,
  User,
  LogOut,
  Settings,
  Calendar,
  MoreVertical,
  Loader2
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchResumes();
    }
  }, [status, router]);

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes');
      if (response.ok) {
        const data = await response.json();
        setResumes(data);
      }
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (!confirm('Are you sure you want to delete this resume?')) {
      return;
    }

    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setResumes(resumes.filter(resume => resume._id !== resumeId));
      }
    } catch (error) {
      console.error('Failed to delete resume:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getResumeCompletionStatus = (resume) => {
    let completedSections = 0;
    const totalSections = 5;

    if (resume.personal?.firstName && resume.personal?.lastName) completedSections++;
    if (resume.summary) completedSections++;
    if (resume.experience?.length > 0) completedSections++;
    if (resume.education?.length > 0) completedSections++;
    if (resume.skills?.length > 0) completedSections++;

    return Math.round((completedSections / totalSections) * 100);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <FileText className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold">CV Builder</span>
              </Link>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {session?.user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Manage your resumes and create new ones to land your dream job.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumes.length}</div>
              <p className="text-xs text-muted-foreground">
                {resumes.length === 1 ? 'resume' : 'resumes'} created
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {resumes.length > 0 
                  ? formatDate(Math.max(...resumes.map(r => new Date(r.updatedAt))))
                  : 'Never'
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Most recent activity
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Templates Used</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(resumes.map(r => r.meta?.templateId || 'modern')).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Different templates
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Resumes Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Resumes</h2>
          <Link href="/dashboard/builder/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Resume
            </Button>
          </Link>
        </div>

        {resumes.length === 0 ? (
          /* Empty State */
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first professional resume
            </p>
            <Link href="/dashboard/builder/new">
              <Button size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Resume
              </Button>
            </Link>
          </Card>
        ) : (
          /* Resumes Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => {
              const completion = getResumeCompletionStatus(resume);
              return (
                <Card key={resume._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">
                          {resume.meta?.title || 'Untitled Resume'}
                        </CardTitle>
                        <CardDescription>
                          Template: {resume.meta?.templateId?.charAt(0).toUpperCase() + resume.meta?.templateId?.slice(1) || 'Modern'}
                        </CardDescription>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/builder/${resume._id}`}>
                              <Edit3 className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteResume(resume._id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      {/* Completion Status */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Completion</span>
                        <Badge variant={completion === 100 ? 'default' : 'secondary'}>
                          {completion}%
                        </Badge>
                      </div>
                      
                      {/* Last Updated */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Last updated</span>
                        <span>{formatDate(resume.updatedAt)}</span>
                      </div>
                      
                      <Separator />
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link href={`/dashboard/builder/${resume._id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <Button variant="outline" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}