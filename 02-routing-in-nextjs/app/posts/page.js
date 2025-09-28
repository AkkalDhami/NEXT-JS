"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    const data = await res.json();
    setPosts(data);
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div className="font-mono p-12">
      <h1 className="text-2xl mb-4">Posts Page</h1>
      <ul className="grid sm:grid-cols-4 gap-4">
        {posts.map(({ id, body, title }, i) => (
          <li key={id} className="w-full h-full">
            <div className="mb-4 bg-zinc-900 hover:bg-zinc-800 duration-150 p-4 rounded-lg">
              <h2 className="text-xl font-semibold line-clamp-1 text-zinc-100">{title}</h2>
              <p className="text-zinc-400 mt-3 line-clamp-6">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
