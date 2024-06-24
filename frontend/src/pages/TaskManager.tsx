import React, { useState } from "react";
// Update TaskFrom typo
import TaskForm from "../components/TaskFrom";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";

const TaskManager: React.FC = () => {
  const {
    tasks,
    loading,
    error,
    addTask,
    modifyTask,
    removeTask,
    setSearch,
    setSortBy,
  } = useTasks();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setSortBy(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <TaskForm addTask={addTask} />
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTerm}
          onChange={handleSearchChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
      {loading ? (
        <p className="text-center">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          modifyTask={modifyTask}
          removeTask={removeTask}
        />
      )}
    </div>
  );
};

export default TaskManager;
