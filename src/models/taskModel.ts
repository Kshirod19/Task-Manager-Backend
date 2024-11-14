import { firestore } from "firebase-admin"; // Correct import for Firestore
import { db } from "../firebaseConfig"; // Firestore instance from your config

// Define ITask interface
export interface ITask {
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  category: string;
  completed: boolean;
}

const tasksCollection = db.collection("tasks");

// Create a new task in Firestore
export const createTask = async (
  task: ITask
): Promise<firestore.DocumentReference> => {
  try {
    const taskRef = await tasksCollection.add(task as Record<string, any>); // Cast ITask to Record<string, any>
    return taskRef;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Error creating task");
  }
};

// Get all tasks from Firestore
export const getTasks = async (): Promise<ITask[]> => {
  try {
    const snapshot = await tasksCollection.get();
    return snapshot.docs.map((doc) => doc.data() as ITask); // Ensure doc.data() is cast to ITask
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Error fetching tasks");
  }
};

// Fetch a single task by ID from Firestore
export const getTaskById = async (taskId: string): Promise<ITask | null> => {
  try {
    const taskDoc = await tasksCollection.doc(taskId).get(); // Get the document by ID
    if (!taskDoc.exists) {
      return null; // Task does not exist
    }
    return taskDoc.data() as ITask; // Return the task data
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw new Error("Error fetching task by ID");
  }
};

// Update task in Firestore
export const updateTask = async (
  taskId: string,
  task: ITask
): Promise<void> => {
  try {
    await tasksCollection.doc(taskId).update(task as Record<string, any>); // Cast ITask to Record<string, any>
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Error updating task");
  }
};

// Delete task from Firestore
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await tasksCollection.doc(taskId).delete(); // Firestore delete method
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Error deleting task");
  }
};
