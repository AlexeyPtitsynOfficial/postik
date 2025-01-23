import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      id: "credentials",
      // We don't do anything because the user should have already been authenticated
      // if thats not the case, you should redirect the user to app #1
      async authorize(credentials, req) {
        return null;
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        domain: ".localhost",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      },
    },
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = user;
      }
      return token;
    },

    async session({ session, token }) {
      session = token as any;
      return session;
    },
  },
});
