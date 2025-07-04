import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "../components/TodoList";

const api = import.meta.env.VITE_API_BASE_URL + "/todos";

const Completed = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await axios.get(api);
    setTodos(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const toggleTodo = async (todo) => {
    await axios.put(`${api}/${todo._id}`, { ...todo, isCompleted: !todo.isCompleted });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${api}/${id}`);
    fetchTodos();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Completed Todos</h2>
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>
      ) : (
        <TodoList todos={todos.filter((t) => t.isCompleted)} onToggle={toggleTodo} onDelete={deleteTodo} />
      )}
    </div>
  );
};

export default Completed;
