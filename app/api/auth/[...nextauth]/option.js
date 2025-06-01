import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnection } from "@/lib/db.js";
import User from "@/models/user.js";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnection();

        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with the email address");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            _id: user._id.toString(),
            email: user.email,
            username: user.username,
            profilePic: user.profilePic,
            bio: user.bio,
            isVerified: user.isVerified,
          };
        } catch (error) {
          console.error("Error during authorize:", error);
          // throw new Error("Login failed. Please check your credentials.");
          throw error
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.email = user.email;
        token.profilePic = user.profilePic;
        token.bio = user.bio;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.profilePic = token.profilePic;
        session.user.bio = token.bio;
        session.user.isVerified = token.isVerified;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
