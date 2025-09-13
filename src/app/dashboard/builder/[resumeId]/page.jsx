'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import useResumeStore from '@/lib/store/resumeStore';
import ResumeBuilder from '@/components/ResumeBuilder';
import { Loader2 } from 'lucide-react';

export default function ResumeBuilderPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { loadResume, resetResume } = useResumeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated' && params.resumeId) {
      initializeResume();
    }
  }, [status, params.resumeId, router]);

  const initializeResume = async () => {
    try {
      if (params.resumeId === 'new') {
        // Create new resume
        resetResume();
      } else {
        // Load existing resume
        await loadResume(params.resumeId);
      }
    } catch (error) {
      console.error('Failed to initialize resume:', error);
      // Redirect to dashboard on error
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">
            {params.resumeId === 'new' ? 'Setting up your new resume...' : 'Loading your resume...'}
          </p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <ResumeBuilder />;
}