import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

const TaskForm = () => {
  const { addTask, error } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if title and description are not empty
    if (!title || !description) {
      setValidationError("Title and description are required.");
      return;
    }

    // Reset validation error if everything is fine
    setValidationError("");

    // Proceed to add the task
    addTask({ title, description, status });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md mb-6"
    >
      <h2 className="text-2xl font-bold  mb-4">Add New Task</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
      >
        Add Task
      </button>
      {/* Display validation error message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
      {validationError && (
        <p className="text-red-500 mt-1">{validationError}</p>
      )}
    </form>
  );
};

export default TaskForm;
