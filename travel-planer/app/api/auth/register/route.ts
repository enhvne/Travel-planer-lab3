import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoose';
import { UserModel } from '@/lib/model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    await connectToDB();

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const username = name.toLowerCase().replace(/\s+/g, '') + Date.now();

    const newUser = new UserModel({
      name,
      username,
      email,
      password: hashedPassword,
      isPro: false
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username
      },
      token
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
