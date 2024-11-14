"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTask = void 0;
const validateTask = (req, res, next) => {
    console.log("Request Body in validation:", req.body); // This will show the incoming request
    const { title, description, deadline } = req.body;
    if (!title || !description || !deadline) {
        res
            .status(400)
            .json({ message: "Title, description, and deadline are required" });
    }
    else if (isNaN(Date.parse(deadline))) {
        res.status(400).json({ message: "Deadline must be a valid date" });
    }
    else {
        next(); // Proceed to the next middleware or route handler
    }
};
exports.validateTask = validateTask;
