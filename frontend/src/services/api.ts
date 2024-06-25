import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getTasks = () => api.get("/tasks");

export const createTask = (task: {
  title: string;
  description: string;
  status: string;
}) => api.post("/tasks", task);

export const updateTask = (
  id: string,
  updates: Partial<{ title: string; description: string; status: string }>
) => api.patch(`/tasks/${id}`, updates);

export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);
