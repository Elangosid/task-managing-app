// context/TaskContext.js
import React, { createContext, useState, useEffect } from "react";
import { db } from "../services/firebaseConfig"; // Ensure this file is correctly exporting the db instance
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch tasks from Firestore on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, "tasks");
        const taskSnapshot = await getDocs(tasksCollection);
        const taskList = taskSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList);
      } catch (err) {
        console.error("Error fetching tasks: ", err);
        setError("Failed to fetch tasks. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTasks();
  }, []);

  // Function to add a new task
  const addTask = async (task) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...task }]);
    } catch (error) {
      console.error("Error adding task: ", error);
      setError("Failed to add task. Please try again.");
    }
  };

  // Function to edit a task
  const editTask = async (updatedTask) => {
    try {
      const taskDoc = doc(db, "tasks", updatedTask.id);
      await updateDoc(taskDoc, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error updating task: ", error);
      setError("Failed to update task. Please try again.");
    }
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
      setError("Failed to delete task. Please try again.");
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, deleteTask, loading, error }}
    >
      {children}
    </TaskContext.Provider>
  );
};
