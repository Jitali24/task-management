import { useState, useEffect } from "react";
import { addTask, updateTask } from "../db/tasks"; // updateTask needs to be created if not already
import { useAuth } from "../context/useAuth";
import type { ITask } from "../types";

interface ActionBarProps {
  loadTasks: () => void;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  taskToEdit: ITask | null;
}

const ActionBar: React.FC<ActionBarProps> = ({
  loadTasks,
  edit,
  setEdit,
  taskToEdit,
}) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Pre-fill form if editing
  useEffect(() => {
    if (edit && taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [edit, taskToEdit]);

  const handleAddTask = async () => {
    if (!title || !description) return;
    try {
      await addTask(title, description, user!.uid);
      resetForm();
      loadTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async () => {
    if (!taskToEdit || !title || !description) return;
    try {
      await updateTask(taskToEdit.id!, {
        title,
        description,
      });
      resetForm();
      setEdit(false);
      loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <div className="my-2 flex items-center justify-center gap-2">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border bg-white border-gray-400 p-2 mr-2 rounded"
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border w-1/2 bg-white border-gray-400 p-2 mr-2 rounded"
      />

      {edit ? (
        <button
          onClick={handleUpdateTask}
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
        >
          Update
        </button>
      ) : (
        <button
          onClick={handleAddTask}
          className="bg-sky-500 text-white  hover:bg-sky-600 px-4 py-2 rounded mr-2 cursor-pointer"
        >
          Add Task
        </button>
      )}

      {edit && (
        <button
          onClick={() => {
            setEdit(false);
            resetForm();
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default ActionBar;
