import { Request, Response, RequestHandler } from "express";
import * as taskModel from "../models/taskModel"; // Import Firebase task model
import { ITask } from "../models/taskModel"; // Import the ITask interface

// Fetch all tasks
export const getTasks: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await taskModel.getTasks(); // Fetch tasks from Firestore
    res.status(200).json(tasks); // Return tasks as JSON
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error fetching tasks:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};

// Fetch a single task by ID
export const getTaskById: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId = req.params.id;
    const task = await taskModel.getTaskById(taskId);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error fetching task:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching task", error: err.message });
  }
};

// Create a new task
export const createTask: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    deadline,
    category,
    completed,
  }: ITask = req.body;

  try {
    const newTask = {
      title,
      description,
      status,
      priority,
      deadline,
      category,
      completed,
    };
    const taskRef = await taskModel.createTask(newTask); // Call the Firebase function
    res.status(201).json({ id: taskRef.id, ...newTask }); // Return the created task
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error creating task:", err.message);
    res
      .status(500)
      .json({ message: "Error creating task", error: err.message });
  }
};

// Update task by ID
export const updateTask: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    title,
    description,
    status,
    priority,
    deadline,
    category,
    completed,
  }: ITask = req.body;
  const updatedTask = {
    title,
    description,
    status,
    priority,
    deadline,
    category,
    completed,
  };

  try {
    await taskModel.updateTask(id, updatedTask); // Call Firebase function to update task
    res.json(updatedTask); // Return updated task
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error updating task:", err.message);
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
};

// Delete task by ID
export const deleteTask: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    await taskModel.deleteTask(id); // Call Firebase function to delete task
    res.json({ message: "Task deleted successfully" }); // Success response
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error deleting task:", err.message);
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
};
