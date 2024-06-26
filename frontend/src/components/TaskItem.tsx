import React, { useState } from "react";
import { ITask } from "../hooks/useTasks";
import Modal from "./ConfirmationModal";

interface TaskItemProps {
  task: ITask;
  modifyTask: (
    id: string,
    updates: Partial<{ title: string; description: string; status: string }>
  ) => void;
  removeTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  modifyTask,
  removeTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    modifyTask(task._id, { status: e.target.value });
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    removeTask(task._id);
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{task.title}</h3>
      <p className="text-gray-700 mb-2">{task.description}</p>
      <div className="flex justify-between items-center">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Confirm Delete"
          message="Are you sure you want to delete this task?"
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default TaskItem;
