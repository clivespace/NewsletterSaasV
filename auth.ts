import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { User } from "@/lib/types"

const mockUsers: (User & { password?: string })[] = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    email: "admin@example.com",
    name: "Admin User",
    role: "ADMIN",
    password: "password123",
    created_at: new Date().toISOString(),
  },
  {
    id: "b2c3d4e5-f6a7-8901-2345-67890abcdef0",
    email: "editor@example.com",
    name: "Editor User",
    role: "EDITOR",
    password: "password123",
    created_at: new Date().toISOString(),
  },
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Provide a static, hardcoded secret for development to ensure stability.
  // In production, this MUST be replaced with an environment variable.
  secret: "a-temporary-and-insecure-secret-for-development",

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials
        if (!email || !password) {
          return null
        }
        const user = mockUsers.find((u) => u.email === email)
        if (user && user.password === password) {
          const { password, ...userWithoutPassword } = user
          return userWithoutPassword
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        const dbUser = mockUsers.find((u) => u.id === user.id)
        if (dbUser) {
          token.role = dbUser.role
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
