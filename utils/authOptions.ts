import {
  AuthOptions,
  User,
  Account,
  Profile,
  Session,
  DefaultSession,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectDb from '@/config/database';
import UserModel from '@/models/User';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth environment variables');
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }) {
      // 1. Connect to the database
      await connectDb();

      // 2. Check if the user exists in the database
      const userExists = await UserModel.findOne({ email: user.email });

      // 3. If the user does not exist, create a new user
      if (!userExists) {
        await UserModel.create({
          // id: user.id,
          email: profile?.email,
          username: profile?.name,
          image: user?.image,
        });
      }
      // 4. If the user exists, return true
      return true;
    },

    async session({ session }: { session: Session }) {
      // 1. Get user from the database
      const dbUser = await UserModel.findOne({ email: session.user?.email });
      // 2. Assign the user id to the session

      if (session.user) {
        session.user.name = dbUser?.username;
        session.user.image = dbUser?.image;
        session.user.email = dbUser?.email;
        session.user.id = dbUser?._id.toString();
      }
      // 3. Return the session
      return session;
    },
  },
};
