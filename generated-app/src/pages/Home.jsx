import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

const api = import.meta.env.VITE_API_BASE_URL + "/todos";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(api);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    await axios.post(api, todo);
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${api}/${todo._id}`, { ...todo, isCompleted: !todo.isCompleted });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${api}/${id}`);
    fetchTodos();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4">
      <div className="w-full max-w-xl bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-white text-center mb-8">To-Do List</h2>

        <AddTodo onAdd={addTodo} />

        {loading ? (
          <div className="text-center text-gray-400 mt-6">Loading...</div>
        ) : (
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        )}
      </div>
    </div>
  );
};

export default Home;
