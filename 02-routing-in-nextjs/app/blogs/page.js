import Link from "next/link";
import React from "react";

export default async function page() {
  return (
    <div className="font-mono p-12">
      <h1> Blog Page</h1>
      <p>Welcome to the blog page. Select a blog to read more.</p>
      <ul className="list-disc list-inside mt-4">
        <li>
          <Link href="/blogs/1" className="text-blue-500 hover:underline">
            Blog 1
          </Link>
        </li>
        <li>
          <Link href="/blogs/2" className="text-blue-500 hover:underline">
            Blog 2
          </Link>
        </li>
        <li>
          <Link href="/blogs/3" className="text-blue-500 hover:underline">
            Blog 3
          </Link>
        </li>
      </ul>
      
    </div>
  );
}
