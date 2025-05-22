import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Энэ хэсгийг export хийж байна!
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Жишээ хэрэглэгч
        if (
          credentials?.email === "john.doe@example.com" &&
          credentials?.password === "123456"
        ) {
          // id-г string болгоно!
          return { id: "1", name: "John Doe", email: "john.doe@example.com" };
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" as const },
  pages: {
    signIn: "/login",
    error: "/login"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };