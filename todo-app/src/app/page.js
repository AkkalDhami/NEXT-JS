"use client";

import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import { useTheme } from "next-themes";
import { LogOut, LucideUser, MoonIcon, SunIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const handleLogout = () => {
    console.log("User logged out");
  };

  // Fix hydration issues with theme
  useEffect(() => {
    setMounted(true);
    fetchTodos();
    fetchUserProfile();
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

  const fetchUserProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      setUser(data?.user || {});
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

  if (!mounted) return null;

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-lg">
          <header className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Todo App
            </h1>
            <div className="flex items-center space-x-4">
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
              <div className="relative inline-block text-left">
                <button
                  onClick={() => setOpen(!open)}
                  className="p-2 flex items-center gap-2 rounded-md cursor-pointer hover:bg-zinc-500/20 transition-colors">
                  <LucideUser className="h-5 w-5" />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 z-10 w-56 rounded-md shadow-lg bg-white dark:bg-slate-900 ring-1 ring-black/5">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-zinc-700">
                      <button
                        onClick={handleLogout}
                        className="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
