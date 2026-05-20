import { betterAuth } from "better-auth";

import { mongodbAdapter }
from "better-auth/adapters/mongodb";

import { MongoClient }
from "mongodb";

const mongoURI =
  process.env.MONGODB_URL;

if (!mongoURI) {

  throw new Error(
    "MONGODB_URL missing"
  );
}

const client =
  new MongoClient(mongoURI);

await client.connect();

const db =
  client.db("mediqueue");

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

  secret:
    process.env.BETTER_AUTH_SECRET,
});