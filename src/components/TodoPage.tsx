"use client";

import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import * as api from "@/lib/api";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.fetchTodos()
      .then(setTodos)
      .catch(() => setError("API server is not running. Please start with: npm run dev"))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (title: string) => {
    try {
      const newTodo = await api.createTodo(title);
      setTodos((prev) => [newTodo, ...prev]);
    } catch {
      alert("Failed to add todo. Is the API server running?");
    }
  };

  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    try {
      const updated = await api.updateTodo(id, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      alert("Failed to update todo.");
    }
  };

  const handleUpdate = async (id: number, title: string) => {
    try {
      const updated = await api.updateTodo(id, { title });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      alert("Failed to update todo.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Failed to delete todo.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Todo App</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList
        todos={todos}
        onToggle={handleToggle}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
