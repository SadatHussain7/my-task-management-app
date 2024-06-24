import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: {
    title: string;
    description: string;
    status: string;
  }) => {
    try {
      const { data } = await createTask(task);
      setTasks([...tasks, data]);
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const modifyTask = async (
    id: string,
    updates: Partial<{ title: string; description: string; status: string }>
  ) => {
    try {
      const { data } = await updateTask(id, updates);
      setTasks(tasks.map((task) => (task._id === id ? data : task)));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, addTask, modifyTask, removeTask };
};
