import { NextResponse } from 'next/server'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/images/profile.png',
  joinedDate: 'January 2024',
  savedTours: 12,
  completedTours: 5,
}

// GET handler
export async function GET() {
  return NextResponse.json(mockUser)
}

// POST handler
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const newUser = {
      name,
      email,
      avatar: '/images/default.png',
      joinedDate: 'May 2025',
      savedTours: 0,
      completedTours: 0,
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: newUser,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
