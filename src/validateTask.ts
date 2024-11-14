import { Request, Response, NextFunction } from "express";

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("Request Body in validation:", req.body); // This will show the incoming request

  const { title, description, deadline } = req.body;

  if (!title || !description || !deadline) {
    res
      .status(400)
      .json({ message: "Title, description, and deadline are required" });
  } else if (isNaN(Date.parse(deadline))) {
    res.status(400).json({ message: "Deadline must be a valid date" });
  } else {
    next(); // Proceed to the next middleware or route handler
  }
};
