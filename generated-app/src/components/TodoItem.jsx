import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <li className={`flex items-center justify-between p-3 mb-2 rounded shadow-sm bg-white dark:bg-gray-800 border dark:border-gray-700 ${todo.isCompleted ? 'opacity-60 line-through' : ''}`}>
    <div className="flex-1">
      <div className="font-semibold text-gray-800 dark:text-gray-100">{todo.title}</div>
      {todo.description && <div className="text-gray-500 dark:text-gray-400 text-sm">{todo.description}</div>}
    </div>
    <div className="flex items-center gap-2 ml-4">
      <button
        onClick={() => onToggle(todo)}
        className={`px-2 py-1 rounded ${todo.isCompleted ? 'bg-green-400 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
      >
        {todo.isCompleted ? 'Undo' : 'Done'}
      </button>
      <button
        onClick={() => onDelete(todo._id)}
        className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  </li>
);

export default TodoItem;
