"use client";

import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "About",
      url: "/about",
    },
    {
      title: "Service",
      url: "/service",
    },
    {
      title: "Posts",
      url: "/posts",
    },
    {
      title: "Todos",
      url: "/todos",
    },
    {
      title: "Blogs",
      url: "/blogs",
    },
    {
      title: "Login",
      url: "/login",
    },
    {
      title: "Register",
      url: "/register",
    },
  ];

  return (
    <header className="font-mono flex items-center justify-between">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
        Logo
      </h2>
      <nav className="flex gap-4">
        {navLinks.map(({ title, url }) => (
          <Link
            key={title}
            href={url}
            className="bg-zinc-500/10 px-4 py-2 rounded-lg">
            {title}
          </Link>
        ))}
      </nav>

      <button onClick={toggleTheme} className="bg-zinc-500/10 px-4 py-2 rounded-lg cursor-pointer">
        Light
      </button>
    </header>
  );
};

export default Header;
