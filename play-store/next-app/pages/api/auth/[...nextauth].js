import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from "../../../lib/prisma";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  jwt: {
    encryption: true,
    raw: false,
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn(props) {
      const { id, name, email, image } = props.user;

      const dbUser = await prisma.user.findFirst({
        where: {
          email,
        }
      })

      if (!dbUser && email)
        await prisma.user.create({
          data: {
            email,
            name
          }
        })

      return true
    },
    async redirect({ url, baseUrl }) {

      return baseUrl
    },
    async session({ session, user, token }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        }
      })

      if (dbUser) {
        session.user.role = dbUser.role;
        token.role = dbUser.role;
      }

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("token = ", token)

      return token
    }
  },
});