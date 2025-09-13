import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Resume from '@/lib/models/Resume';

// GET /api/resumes/[id] - Get a specific resume
export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const resume = await Resume.findOne({
      _id: params.id,
      userId: session.user.id,
    });

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
}

// PUT /api/resumes/[id] - Update a specific resume
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    await dbConnect();

    const resume = await Resume.findOneAndUpdate(
      {
        _id: params.id,
        userId: session.user.id,
      },
      { ...body },
      { new: true, runValidators: true }
    );

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error updating resume:', error);
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    );
  }
}

// DELETE /api/resumes/[id] - Delete a specific resume
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const resume = await Resume.findOneAndDelete({
      _id: params.id,
      userId: session.user.id,
    });

    if (!resume) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    );
  }
}