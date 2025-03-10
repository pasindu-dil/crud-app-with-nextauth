import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { api } from "../api/instance";

export const authProviders = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "username" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const loginData = {
        email: credentials?.username,
        password: credentials?.password,
      };

      const response = await api.post("/auth/login", loginData);
      console.log(response.data);
      
      return response.data;
    },
  })
];