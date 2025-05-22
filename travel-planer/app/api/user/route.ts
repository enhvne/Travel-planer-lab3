import { NextResponse } from 'next/server'

// Mock хэрэглэгчийн мэдээлэл
let user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  image: '/default-avatar.png',
  comments: [],
  // New mock data for other sections
  savedTours: 15,
  completedTours: 5,
  settings: {
    emailNotifications: true,
    language: 'en',
    currency: 'usd',
  },
  password: 'password123' // Add mock password for verification
}

// GET handler
export async function GET(req: Request) {
  // Token шалгах (mock)
  const auth = req.headers.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(user)
}

// POST handler
export async function POST(req: Request) {
  const auth = req.headers.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    // Update only allowed fields
    if (body.name !== undefined) user.name = body.name
    if (body.email !== undefined) user.email = body.email
    if (body.image !== undefined) user.image = body.image // For photo edit mock
    if (body.settings !== undefined) user.settings = { ...user.settings, ...body.settings } // Merge settings
    
    // Handle password change
    if (body.currentPassword && body.newPassword) {
      if (body.currentPassword !== user.password) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
      }
      user.password = body.newPassword
      return NextResponse.json({ message: 'Password changed successfully' })
    }

    // Note: Comments, savedTours, completedTours, activity, password change are not handled by this POST for simplicity in mock.

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}
