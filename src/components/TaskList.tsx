import React from "react";
import { format } from "date-fns";
import type { ITask } from "../types";
import type { Timestamp } from "firebase/firestore";

type TaskListProps = {
  tasks: ITask[];
  onToggleComplete: (task: ITask) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleEdit: (task: ITask) => Promise<void>;
};

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  handleDelete,
  handleEdit,
}) => {
  const handleCheckboxChange = (task: ITask) => {
    console.log("Toggle complete for task:", task.id, "→", !task.completed);
    onToggleComplete?.(task);
  };

  function isFirestoreTimestamp(value: unknown): value is Timestamp {
    return (
      typeof value === "object" &&
      value !== null &&
      "toDate" in value &&
      typeof (value as { toDate?: unknown }).toDate === "function"
    );
  }

  return (
    // <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition">
    <ul className="max-w-3xl divide-y flex flex-col gap-4 divide-gray-200">
      {tasks.map((task: ITask) => (
        <li
          key={task.id}
          className={`flex items-start justify-between p-4 bg-white rounded-md ${
            task.completed ? "opacity-80" : ""
          }`}
        >
          <div className="flex flex-1 gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCheckboxChange(task)}
              className="mt-1 h-5 w-5 accent-blue-600"
            />

            <div className="flex flex-col space-y-1">
              <h3
                className={`text-lg font-semibold text-gray-900 ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.title}
              </h3>
              <p
                className={`text-gray-600 ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.description}
              </p>
              <time className="text-sm text-gray-400">
                {task.createdAt
                  ? format(
                      isFirestoreTimestamp(task.createdAt)
                        ? task.createdAt.toDate()
                        : new Date(task.createdAt),
                      "MMM dd, yyyy h:mm a"
                    )
                  : "Unknown date"}
              </time>
            </div>
          </div>

          <div className="flex items-start space-x-3 ml-4">
            {/* Edit Button */}
            <button
              onClick={() => handleEdit(task)}
              aria-label="Edit task"
              className="text-sky-500 hover:text-sky-600 transition cursor-pointer"
              title="Edit Task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M16.5 3.75a2.121 2.121 0 113 3L7 19.25H4.75v-2.25L16.5 3.75z"
                />
              </svg>
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(task.id!)}
              aria-label="Delete task"
              className="text-red-600 hover:text-red-800 transition cursor-pointer"
              title="Delete Task"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
    // </div>
  );
};
