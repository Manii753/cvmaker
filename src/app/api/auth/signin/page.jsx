'use client';

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Github, 
  Chrome, 
  Loader2, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setError('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard');
      }
    });
  }, [router]);

  const handleSignIn = async (providerName) => {
    setIsLoading(true);
    setProvider(providerName);
    setError('');

    try {
      const result = await signIn(providerName, {
        callbackUrl: '/dashboard',
        redirect: false,
      });

      if (result?.error) {
        setError('Authentication failed. Please try again.');
        setIsLoading(false);
        setProvider('');
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
      setProvider('');
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex p-4">
      <div className="w-full max-w-md ">
        {/* Header */}
        <div className="flex flex-col gap-[20px] px  text-center mb-8">
          <Link href="/" className="inline-flex gap-2 m-6 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center gap-2 ">
            <FileText className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">CV Builder</span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to continue building your professional resume
          </p>
        </div>

        {/* Sign In Card */}
        <Card className='w-fit items-center m-auto p-[30px] flex flex-col gap-[15px] '>
          <CardHeader className="w-full gap-[5px]">
            <CardTitle >Sign In</CardTitle>
            <CardDescription >
              Choose your preferred sign-in method to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Google Sign In */}
            <Button
              variant="outline"
              className="w-full my-[5px] p-[5px]"
              onClick={() => handleSignIn('google')}
              disabled={isLoading}
            >
              {isLoading && provider === 'google' ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Chrome className="w-4 h-4 mr-2" />
              )}
              Continue with Google
            </Button>

            {/* GitHub Sign In */}
            <Button
              variant="outline"
              className="w-full my-[5px] p-[5px]"
              onClick={() => handleSignIn('github')}
              disabled={isLoading}
            >
              {isLoading && provider === 'github' ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Github className="w-4 h-4 mr-2" />
              )}
              Continue with GitHub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secure Authentication
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Your data is encrypted and secure</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>No spam, we respect your privacy</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Free to use, no hidden charges</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            By signing in, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}