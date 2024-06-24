import React from "react";
import TaskItem from "./TaskItem";
import { ITask } from "../hooks/useTasks";

interface TaskListProps {
  tasks: ITask[];
  modifyTask: (
    id: string,
    updates: Partial<{ title: string; description: string; status: string }>
  ) => void;
  removeTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  modifyTask,
  removeTask,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto my-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          modifyTask={modifyTask}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
