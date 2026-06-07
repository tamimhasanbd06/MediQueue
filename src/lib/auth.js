import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const mongoURI = process.env.MONGODB_URL;
if (!mongoURI) {
  throw new Error("MONGODB_URL missing");
}

const client = new MongoClient(mongoURI);
const db = client.db("mediqueue");

const trustedOrigins = [
  "http://localhost:3000",
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
].filter(Boolean);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },

  trustedOrigins,

  secret: process.env.BETTER_AUTH_SECRET,

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 10 * 24 * 60 * 60,
    },
  },

  plugins: [jwt()],
});
