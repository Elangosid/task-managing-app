// components/TaskList.js
import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = ({ status }) => {
  const { tasks, loading, error } = useContext(TaskContext);

  if (loading) return <p className="text-center text-lg">Loading tasks...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const filteredTasks = tasks.filter(task => task.status === status);
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          className="p-4"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="text-2xl font-bold mb-4">{status} Tasks</h2>
          <div className="mt-2 space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={task.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskItem task={task} />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <p className="text-center text-gray-500">No {status} tasks.</p>
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
