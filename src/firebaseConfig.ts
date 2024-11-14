// firebaseConfig.ts
import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Get the service account path dynamically from environment variables
const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_PRIVATE_KEY_PATH || '');

// Initialize Firebase Admin SDK with credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath), // Use the path from the .env file
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Use the environment variable for database URL
});

const db = admin.firestore();
export { db };

