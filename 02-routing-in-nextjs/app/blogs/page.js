import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Blogs ",
};

export const dynamicParams = false;
export const revalidate = 5;

export function generateStaticParams() {
  return [{ blogId: "1" }, { blogId: "2" }, { blogId: "3" }, { blogId: "4" }];
}

export default async function page() {
  return (
    <div className="font-mono p-12">
      <h1> Blog Page</h1>
      <p>Welcome to the blog page. Select a blog to read more.</p>
      <h3>Date: {new Date().toLocaleString()}</h3>
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
