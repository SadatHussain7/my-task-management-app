import { Request, Response } from "express";
import Task, { ITask } from "../models/task";
import { AuthRequest } from "../middleware/auth";
import { SortOrder } from "mongoose";

export const createTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const task = new Task({ ...req.body, user: req.user._id });
    await task.save();
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { status, search, sortBy, sortOrder } = req.query;
  const filter: { user: string; status?: string; title?: object } = {
    user: req.user._id,
    ...(status ? { status: status.toString() } : {}),
  };

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const sort: { [key: string]: number } = sortBy
    ? { [sortBy as string]: sortOrder === "desc" ? -1 : 1 }
    : {};

  try {
    const tasks: ITask[] = await Task.find(filter).sort(
      sort as { [key: string]: SortOrder | { $meta: any } }
    );
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "status", "dueDate"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    res.status(400).json({ error: "Invalid updates!" });
    return;
  }

  try {
    const task: ITask | null = await Task.findOne({
      _id: id,
      user: req.user._id,
    });
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
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const task: ITask | null = await Task.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
