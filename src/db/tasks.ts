import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import type { ITask } from '../types'

export const addTask = async (
  title: string,
  description: string,
  userId: string
) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      title,
      description,
      createdAt: serverTimestamp(),
      completed: false,
      userId,
    })

    return { success: true, id: docRef.id }
  } catch (error: unknown) {
    console.error('Error adding task:', error)
    throw new Error(error instanceof Error ? error.message : `${error}`)
  }
}

export const getTasksByUser = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc') // latest first
    )

    const querySnapshot = await getDocs(q)

    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ITask[]

    return tasks
  } catch (error: unknown) {
    console.error('Error fetching tasks:', error)
    throw new Error(error instanceof Error ? error.message : `${error}`)
  }
}

export const toggleTaskCompletion = async (
  taskId: string,
  currentValue: boolean
) => {
  try {
    await updateDoc(doc(db, 'tasks', taskId), {
      completed: !currentValue,
    })

    return { success: true }
  } catch (error: unknown) {
    console.error('Error updating task:', error)
    throw new Error(error instanceof Error ? error.message : `${error}`)
  }
}

export const deleteTask = async (taskId: string) => {
  try {
    await deleteDoc(doc(db, 'tasks', taskId))
    return { success: true }
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : `${error}`)
  }
}

export const updateTask = async (
  taskId: string,
  updates: {
    title?: string
    description?: string
  }
) => {
  try {
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, updates)
    return { success: true }
  } catch (error: unknown) {
    console.error('Error updating task:', error)
    throw new Error(error instanceof Error ? error.message : `${error}`)
  }
}
