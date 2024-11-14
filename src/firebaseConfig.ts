import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Declare a variable for db at the top level
let db: admin.firestore.Firestore | null = null;

try {
  // Define the absolute path to the service account key
  const serviceAccountPath = path.resolve(
    __dirname,       // Current directory where the compiled file is located
    "../",            // Go up one level from dist/ (compiled files)
    "src/config/serviceAccountKey.json" // Relative path to the service account key
  );

  console.log("Resolved Path: ", serviceAccountPath);

  // Check if the file exists and is a valid file
  const stat = fs.lstatSync(serviceAccountPath);
  
  if (stat.isFile()) {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

    // Initialize Firebase Admin SDK with credentials
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });

    // Initialize Firestore db
    db = admin.firestore();
  } else {
    throw new Error("Service account file is not a valid file or path is incorrect.");
  }
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Failed to initialize Firebase:", error.message);
  } else {
    console.error("An unknown error occurred during Firebase initialization.");
  }
  process.exit(1); // Stop the application if Firebase setup fails
}

// Export db after initialization
export { db };
