// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const res = await fetch('http://localhost:3000/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        })

        const user = await res.json()
        if (!res.ok || !user) {
          return null
        }
        return user
      }
    })
  ],
  pages: {
    signIn: '/auth/signin', // Assurez-vous que cette URL est correcte
    signOut: '/auth/signout', // URL pour la déconnexion, si vous avez une page dédiée
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user } : any) {
      if (user) {
        token.id = user.token
        token.email = user.user.email
      }
      return token
    },
    async session({ session, token } : any) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }
