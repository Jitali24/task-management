import React, { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { deleteTask, getTasksByUser, toggleTaskCompletion } from "../db/tasks";
import { Alert } from "../components/Alert";
import type { ITask } from "../types";
import { logout } from "../db/logout";
import { TaskList } from "../components/TaskList";
import ActionBar from "../components/ActionBar";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [edit, setEdit] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);
  const [listError, setListError] = useState<string>("");

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasksByUser(user!.uid);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setListError(error instanceof Error ? error.message : `${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleComplete = async (task: ITask) => {
    try {
      await toggleTaskCompletion(task.id, task.completed);
      loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleEdit = async (task: ITask) => {
    setEdit(true);
    setTaskToEdit(task);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-100 to-teal-100 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-600 tracking-tight">
            Welcome, <span className="text-teal-600">{user?.email}</span>
          </h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition-shadow shadow-sm hover:shadow-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* ActionBar */}
        <div className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
          <ActionBar
            loadTasks={loadTasks}
            edit={edit}
            setEdit={setEdit}
            taskToEdit={taskToEdit}
          />
        </div>

        {/* Task List */}
        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="text-gray-600 text-sm">Loading tasks...</p>
          ) : listError === "" ? (
            <TaskList
              tasks={tasks}
              handleDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
              handleEdit={handleEdit}
            />
          ) : (
            <Alert type="error" message={listError} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
