import { Router } from "express";
import * as taskController from "../controllers/taskController";  // Import controller methods

const router = Router();

// Route to get all tasks
router.get("/", taskController.getTasks);

// Route to create a new task
router.post("/", taskController.createTask);

// Route to update a task by ID
router.put("/:id", taskController.updateTask);

// Route to delete a task by ID
router.delete("/:id", taskController.deleteTask);

export default router;
  