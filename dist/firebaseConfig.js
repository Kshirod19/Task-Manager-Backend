"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config();
// Declare a variable for db at the top level
let db = null;
exports.db = db;
try {
    // Define the absolute path to the service account key
    const serviceAccountPath = path_1.default.resolve(__dirname, // Current directory where the compiled file is located
    "../", // Go up one level from dist/ (compiled files)
    "src/config/serviceAccountKey.json" // Relative path to the service account key
    );
    console.log("Resolved Path: ", serviceAccountPath);
    // Check if the file exists and is a valid file
    const stat = fs_1.default.lstatSync(serviceAccountPath);
    if (stat.isFile()) {
        const serviceAccount = JSON.parse(fs_1.default.readFileSync(serviceAccountPath, "utf8"));
        // Initialize Firebase Admin SDK with credentials
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(serviceAccount),
            projectId: process.env.FIREBASE_PROJECT_ID,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
        });
        // Initialize Firestore db
        exports.db = db = firebase_admin_1.default.firestore();
    }
    else {
        throw new Error("Service account file is not a valid file or path is incorrect.");
    }
}
catch (error) {
    if (error instanceof Error) {
        console.error("Failed to initialize Firebase:", error.message);
    }
    else {
        console.error("An unknown error occurred during Firebase initialization.");
    }
    process.exit(1); // Stop the application if Firebase setup fails
}
