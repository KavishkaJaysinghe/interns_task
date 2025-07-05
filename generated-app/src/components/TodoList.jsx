import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onDelete }) => (
  <ul className="mt-4">
    {todos.length === 0 ? (
      <li className="text-gray-500 dark:text-gray-400 text-center">No todos found.</li>
    ) : (
      todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))
    )}
  </ul>
);

export default TodoList;
