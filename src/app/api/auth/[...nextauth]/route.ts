import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

export const Prisma = new PrismaClient();
import dotenv from "dotenv"

dotenv.config();

type SessionProps = {
    session: any;
    user: any;
};

export const authOptions = {
    adapter: PrismaAdapter(Prisma),

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider ({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? ""
        })
    ],

    secret: process.env.NEXTAUTH_URL,

    callbacks: {
        async session({ session, user } : SessionProps) {
            session.user.id = user.id;
            return session;
        },
    },
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };