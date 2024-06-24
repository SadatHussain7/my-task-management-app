import { Request, Response } from "express";
import Task, { ITask } from "../models/task";

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task: ITask = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  try {
    const tasks: ITask[] = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "status"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    res.status(400).json({ error: "Invalid updates!" });
    return;
  }

  try {
    const task: ITask | null = await Task.findById(id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const task: ITask | null = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
