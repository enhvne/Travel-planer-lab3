// lib/userService.ts
import { User } from '@/models/model';
import jwt from 'jsonwebtoken';

const mockUsers: User[] = [
    {
        id: 1,
        name: "John Doe",
        image: "/images/profile.jpg",
        role: "user",
        username: "johndoe",
        email: "john@example.com",
        password: "hashedPassword",
        wishLists: null,
        comments: null,
        isPro: false,
        recently: null,
        messages: null
    }
];
  
export function getUserById(id: number): User | null {
    return mockUsers.find(user => user.id === id) || null;
}

export async function getUserFromToken(token: string): Promise<User | null> {
    // Хуулбар жишээ - энэ хэсгийг таны токен decode хийх логикт тааруулж өөрчлөх хэрэгтэй
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
        return decoded;
    } catch {
        return null;
    }
}
