import React from "react";
import TaskForm from "../components/TaskFrom";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";

const TaskManager: React.FC = () => {
  const { tasks, loading, error, addTask, modifyTask, removeTask } = useTasks();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <TaskForm addTask={addTask} />
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
