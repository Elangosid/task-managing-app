// components/TaskItem.js
import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { editTask, deleteTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleEdit = () => {
    editTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="border rounded-md p-4 mb-4 shadow-md">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
          />
          <textarea
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
            rows="3"
          />
          <select
            value={updatedTask.status}
            onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-black rounded-md p-2 hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <h4 className="text-xl font-semibold">{task.title}</h4>
          <p className="text-gray-700 mb-2">{task.description}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white rounded-md p-2 hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
