import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";

// Define your auth options
const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
        console.log("Redirecting from:", url, "Base URL:", baseUrl);
      
        // Always redirect to /editor after sign-in
        return `${baseUrl}/editor`;
      }
      
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Export the HTTP handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };