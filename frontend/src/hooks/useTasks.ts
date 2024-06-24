import { useState, useEffect } from "react";
import axios from "axios";

export interface ITask {
  _id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  dueDate?: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const fetchTasks = async () => {
    try {
      const params = { search, sortBy };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks`,
        { params }
      );
      setTasks(response.data);
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
    dueDate?: string;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks`,
        task
      );
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const modifyTask = async (
    id: string,
    updates: Partial<{
      title: string;
      description: string;
      status: string;
      dueDate?: string;
    }>
  ) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/tasks/${id}`,
        updates
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const removeTask = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, sortBy]);

  return {
    tasks,
    loading,
    error,
    addTask,
    modifyTask,
    removeTask,
    setSearch,
    setSortBy,
  };
};
