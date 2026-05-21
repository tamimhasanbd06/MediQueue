import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const mongoURI = process.env.MONGODB_URL;

if (!mongoURI) {
  throw new Error("MONGODB_URL missing");
}

const client = new MongoClient(mongoURI);

await client.connect();

const db = client.db("mediqueue");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: [
    "http://localhost:3000",
  ],

  secret: process.env.BETTER_AUTH_SECRET,

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 10 * 24 * 60 * 60,
    },
  },

  plugins: [
    jwt(),
  ],
});