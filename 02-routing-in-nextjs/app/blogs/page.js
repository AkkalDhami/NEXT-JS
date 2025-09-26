import Comments from "@/components/Comments";
import Likes from "@/components/Likes";
import Views from "@/components/Views";
import Link from "next/link";
import React, { Suspense } from "react";

export const metadata = {
  title: "Blogs ",
};

// ISR
export const dynamicParams = false;

// export const revalidate = 5;

// SSG
// export function generateStaticParams() {
//   return [{ blogId: "1" }, { blogId: "2" }, { blogId: "3" }, { blogId: "4" }];
// }

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

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Views views={10} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Likes likes={10} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Comments comments={10} />
        </Suspense>
      </div>
    </div>
  );
}
