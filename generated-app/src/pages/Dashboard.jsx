import React, { useState, useEffect } from "react";
import { Plus, Clock, CheckCircle, Circle, User, Calendar, Flag, Loader2, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    tags: ""
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const API_BASE_URL = 'http://localhost:5000/api';

  const kanbanColumns = [
    { id: "todo", label: "To Do", color: "#f8fafc", borderColor: "#e2e8f0", icon: Circle, count: tasks.filter(t => t.status === "todo").length },
    { id: "inprogress", label: "In Progress", color: "#fef3c7", borderColor: "#fbbf24", icon: Clock, count: tasks.filter(t => t.status === "inprogress").length },
    { id: "completed", label: "Completed", color: "#d1fae5", borderColor: "#10b981", icon: CheckCircle, count: tasks.filter(t => t.status === "completed").length }
  ];

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const newTask = await response.json();
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  // Update task status (PATCH)
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const updatedTask = await response.json();
      setTasks(prev => prev.map(task => task._id === taskId ? { ...task, ...updatedTask } : task));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete task
  const deleteTaskFromDB = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${taskId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    if (!newTask.title.trim()) return;
    try {
      const taskData = {
        title: newTask.title,
        description: newTask.description,
        status: "todo",
        priority: newTask.priority,
        assignee: newTask.assignee || null,
        dueDate: newTask.dueDate || null,
        tags: newTask.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };
      await createTask(taskData);
      setNewTask({ title: "", description: "", priority: "medium", assignee: "", dueDate: "", tags: "" });
      setShowAddForm(false);
    } catch (err) {}
  };

  const moveTask = (taskId, newStatus) => { updateTaskStatus(taskId, newStatus); };
  const deleteTask = (taskId) => { deleteTaskFromDB(taskId); };
  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#6b7280";
    }
  };

  const TaskCard = ({ task }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-sm">{task.title}</h3>
        <div className="flex items-center gap-1">
          <Flag size={12} color={getPriorityColor(task.priority)} fill={getPriorityColor(task.priority)} />
          <button onClick={() => deleteTask(task._id)} className="text-gray-400 hover:text-red-500 text-xs">×</button>
        </div>
      </div>
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {(task.tags || []).map((tag, idx) => (
          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{tag}</span>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <User size={12} />
          <span>{task.assignee || "Unassigned"}</span>
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      <div className="flex gap-1 mt-3">
        {task.status !== "todo" && (
          <button onClick={() => moveTask(task._id, "todo")} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded hover:bg-gray-200">To Do</button>
        )}
        {task.status !== "inprogress" && (
          <button onClick={() => moveTask(task._id, "inprogress")} className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded hover:bg-yellow-200">In Progress</button>
        )}
        {task.status !== "completed" && (
          <button onClick={() => moveTask(task._id, "completed")} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200">Complete</button>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchTasks} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
          <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" disabled={submitting}>
            <Plus size={20} />
            Add Task
          </button>
        </div>
        {showAddForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
            <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-center">Add New Task</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Task Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80" />
                <textarea placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80" rows="3" />
                <div className="grid grid-cols-2 gap-4">
                  <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80">
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80" />
                </div>
                <input type="text" placeholder="Assignee" value={newTask.assignee} onChange={e => setNewTask({ ...newTask, assignee: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80" />
                <input type="text" placeholder="Tags (comma separated)" value={newTask.tags} onChange={e => setNewTask({ ...newTask, tags: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80" />
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={addTask} disabled={submitting} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {submitting ? 'Adding...' : 'Add Task'}
                </button>
                <button onClick={() => setShowAddForm(false)} disabled={submitting} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {kanbanColumns.map(column => {
            const Icon = column.icon;
            const columnTasks = tasks.filter(task => task.status === column.id);
            return (
              <div key={column.id} className="flex-shrink-0 w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon size={20} color={column.borderColor} />
                    <h2 className="font-semibold text-gray-900">{column.label}</h2>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">{column.count}</span>
                  </div>
                </div>
                <div className="min-h-96 max-h-96 overflow-y-auto">
                  {columnTasks.map(task => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                  {columnTasks.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">📋</div>
                      <p>No tasks yet</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;