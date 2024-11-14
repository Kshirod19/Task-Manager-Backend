"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const firebaseConfig_1 = require("../firebaseConfig"); // Firestore instance from your config
// Check if db is initialized (not null) before proceeding
if (!firebaseConfig_1.db) {
    throw new Error("Firebase Firestore instance is not initialized.");
}
const tasksCollection = firebaseConfig_1.db.collection("tasks");
// Create a new task in Firestore
const createTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskRef = yield tasksCollection.add(task); // Cast ITask to Record<string, any>
        return taskRef;
    }
    catch (error) {
        console.error("Error creating task:", error);
        throw new Error("Error creating task");
    }
});
exports.createTask = createTask;
// Get all tasks from Firestore
const getTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield tasksCollection.get();
        return snapshot.docs.map((doc) => doc.data()); // Ensure doc.data() is cast to ITask
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Error fetching tasks");
    }
});
exports.getTasks = getTasks;
// Fetch a single task by ID from Firestore
const getTaskById = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskDoc = yield tasksCollection.doc(taskId).get(); // Get the document by ID
        if (!taskDoc.exists) {
            return null; // Task does not exist
        }
        return taskDoc.data(); // Return the task data
    }
    catch (error) {
        console.error("Error fetching task by ID:", error);
        throw new Error("Error fetching task by ID");
    }
});
exports.getTaskById = getTaskById;
// Update task in Firestore
const updateTask = (taskId, task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tasksCollection.doc(taskId).update(task); // Cast ITask to Record<string, any>
    }
    catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Error updating task");
    }
});
exports.updateTask = updateTask;
// Delete task from Firestore
const deleteTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield tasksCollection.doc(taskId).delete(); // Firestore delete method
    }
    catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Error deleting task");
    }
});
exports.deleteTask = deleteTask;
