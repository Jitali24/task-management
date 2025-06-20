import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";

// Define the structure of a Task (excluding Firestore metadata like id)
export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: Timestamp;
  userId: string;
  completed?: boolean;
};

// Reference to the "tasks" collection
const taskRef = collection(db, "tasks");

// Add a new task to Firestore
export const addTask = async (
  title: string,
  description: string,
  userId: string
) => {
  return await addDoc(taskRef, {
    title,
    description,
    createdAt: Timestamp.now(),
    userId,
    completed: false,
  });
};

// Fetch all tasks for a specific user
export const fetchTasks = async (userId: string): Promise<Task[]> => {
  const q = query(taskRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Task, "id">),
  }));
};

// Update a task by ID (only allow updating selected fields)
export const updateTask = async (
  id: string,
  updates: Partial<Pick<Task, "title" | "description" | "completed">>
) => {
  const taskDoc = doc(db, "tasks", id);
  await updateDoc(taskDoc, updates);
};

// Delete a task by ID
export const deleteTask = async (id: string) => {
  await deleteDoc(doc(db, "tasks", id));
};
