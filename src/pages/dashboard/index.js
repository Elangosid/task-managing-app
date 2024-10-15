// Dashboard.js
import { useNavigate } from "react-router-dom";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import { doSignOut } from "../../services/auth";
import { DragDropContext } from "react-beautiful-dnd";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { tasks, editTask } = useContext(TaskContext);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const currentTasks = tasks.filter((data) => data.id === source.index);
    if (currentTasks?.length) {
      const firstObj = currentTasks[0];
      firstObj.status = destination?.droppableId
      editTask(firstObj);
    }
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100 p-4 w-full ">
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="flex space-x-4 w-full mb-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full flex-grow">
              <TaskForm />
            </div>
            <div className="bg-white shadow-md rounded-lg w-full p-6 flex-grow">
              <TaskList status="To Do" />
            </div>
            <div className="bg-white shadow-md rounded-lg w-full p-6 flex-grow">
              <TaskList status="In Progress" />
            </div>
            <div className="bg-white shadow-md rounded-lg w-full p-6 flex-grow">
              <TaskList status="Completed" />
            </div>
          </div>
        </DragDropContext>
      </div>
      <button
        onClick={() => {
          doSignOut().then(() => {
            navigate("/");
          });
        }}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
