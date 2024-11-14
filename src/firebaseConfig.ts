// firebaseConfig.ts
import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config();

// Get the service account path dynamically
const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_PRIVATE_KEY_PATH || '');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,  // Use the environment variable for database URL
});

const db = admin.firestore();
export { db };
