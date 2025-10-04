"use client";

import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues with theme
  useEffect(() => {
    setMounted(true);
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data?.todos || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Add new todo
  const addTodo = async (text) => {
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();

      if (!data?.success) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        // Add to state immediately
        setTodos((prev) => [...prev, data.todo]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add todo");
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((todo) => todo?._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id) => {
    const todo = todos?.find((t) => t?._id === id);
    if (!todo) return;

    try {
      await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Update todo text
  const updateTodo = async (id, newText) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });
      const data = await res.json();
      if (data.success) {
        setTodos((prev) =>
          prev.map((t) => (t._id === id ? { ...t, text: newText } : t))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted) return null; // prevent hydration mismatch

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-lg">
          <header className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Todo App
            </h1>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme">
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </header>

          <TodoForm addTodo={addTodo} />

          <main className="mt-6">
            <TodoList
              todos={todos}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
            />
          </main>
        </div>
      </div>
    </>
  );
}
