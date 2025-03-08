import { NextAuthOptions } from "next-auth";
import { authProviders } from "../config/auth-providers";
import { User } from "@/entities/user/models/user-types";

export const nextAuthOptions: NextAuthOptions = {
  providers: authProviders,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) { 
      return true
    },
    session({ session, token }) {
      if (token.user) {
        session.user = token.user as User;
      }
      return session;
    },
    async jwt({ token, user }) {            
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};