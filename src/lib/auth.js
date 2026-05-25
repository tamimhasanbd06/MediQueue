import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const mongoURI = process.env.MONGODB_URL;

if (!mongoURI) {
  throw new Error("MONGODB_URL missing");
}

const client = new MongoClient(mongoURI);

const socialProviders = {};

if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET
) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

await client.connect();

const db = client.db("mediqueue");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  ...(Object.keys(socialProviders).length
    ? { socialProviders }
    : {}),

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