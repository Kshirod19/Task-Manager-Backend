"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// firebaseConfig.ts
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config();
// Get the service account path dynamically
const serviceAccountPath = path_1.default.resolve(__dirname, process.env.FIREBASE_PRIVATE_KEY_PATH || '');
// Initialize Firebase Admin
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccountPath),
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL, // Use the environment variable for database URL
});
const db = firebase_admin_1.default.firestore();
exports.db = db;
