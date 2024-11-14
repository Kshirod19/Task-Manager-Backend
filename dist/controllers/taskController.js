"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const taskModel = __importStar(require("../models/taskModel")); // Import Firebase task model
// Fetch all tasks
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskModel.getTasks(); // Fetch tasks from Firestore
        res.status(200).json(tasks); // Return tasks as JSON
    }
    catch (error) {
        const err = error;
        console.error("Error fetching tasks:", err.message);
        res
            .status(500)
            .json({ message: "Error fetching tasks", error: err.message });
    }
});
exports.getTasks = getTasks;
// Fetch a single task by ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield taskModel.getTaskById(taskId);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.status(200).json(task);
    }
    catch (error) {
        const err = error;
        console.error("Error fetching task:", err.message);
        res
            .status(500)
            .json({ message: "Error fetching task", error: err.message });
    }
});
exports.getTaskById = getTaskById;
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, deadline, category, completed, } = req.body;
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
        const taskRef = yield taskModel.createTask(newTask); // Call the Firebase function
        res.status(201).json(Object.assign({ id: taskRef.id }, newTask)); // Return the created task
    }
    catch (error) {
        const err = error;
        console.error("Error creating task:", err.message);
        res
            .status(500)
            .json({ message: "Error creating task", error: err.message });
    }
});
exports.createTask = createTask;
// Update task by ID
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, status, priority, deadline, category, completed, } = req.body;
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
        yield taskModel.updateTask(id, updatedTask); // Call Firebase function to update task
        res.json(updatedTask); // Return updated task
    }
    catch (error) {
        const err = error;
        console.error("Error updating task:", err.message);
        res
            .status(500)
            .json({ message: "Error updating task", error: err.message });
    }
});
exports.updateTask = updateTask;
// Delete task by ID
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield taskModel.deleteTask(id); // Call Firebase function to delete task
        res.json({ message: "Task deleted successfully" }); // Success response
    }
    catch (error) {
        const err = error;
        console.error("Error deleting task:", err.message);
        res
            .status(500)
            .json({ message: "Error deleting task", error: err.message });
    }
});
exports.deleteTask = deleteTask;
