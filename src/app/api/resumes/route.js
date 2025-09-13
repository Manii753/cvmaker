import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Resume from '@/lib/models/Resume';

// GET /api/resumes - Get all resumes for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const resumes = await Resume.find({ 
      userId: session.user.id 
    }).sort({ updatedAt: -1 });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}

// POST /api/resumes - Create a new resume
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    await dbConnect();

    const resume = new Resume({
      userId: session.user.id,
      ...body,
    });

    await resume.save();

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error('Error creating resume:', error);
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    );
  }
}