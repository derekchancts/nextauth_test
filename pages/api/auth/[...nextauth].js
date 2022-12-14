import NextAuth from 'next-auth'
import EmailProvider from "next-auth/providers/email";

import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from '../../../lib/mongodb'
import connectDB from '../../../config/connectDB';

// import { FirebaseAdapter } from "@next-auth/firebase-adapter"
// import { initializeApp, getApp, getApps } from "firebase/app";
// import { getFirestore, collection, query, getDocs, where, limit, doc, getDoc, addDoc, updatedDoc, deleteDoc, runTransaction } from 'firebase/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyDGas_8rsUYrZtjpHcwQm_URIqzu7PHALY",
//   authDomain: "nextauthtest-f5aac.firebaseapp.com",
//   projectId: "nextauthtest-f5aac",
//   storageBucket: "nextauthtest-f5aac.appspot.com",
//   messagingSenderId: "868668476573",
//   appId: "1:868668476573:web:734fa26e9ec1378a0a1874"
// };

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();


connectDB();


export default NextAuth({ 
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    }),
  ],
  pages: {
    signIn: "/signin"
  },
  adapter: MongoDBAdapter(clientPromise),
  database: {
    type: "mongodb",
    useNewUrlParser: true,
    url: process.env.MONGODB_URL,
  },

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT
  
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true
  },
  jwt: {
    secret: process.env.JWT_PRIVATE_KEY,
    encryption: true
  },
})