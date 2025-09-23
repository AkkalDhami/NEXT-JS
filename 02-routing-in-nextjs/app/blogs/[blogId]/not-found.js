
"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
  const a = usePathname();
  console.log(a);
  return (
    <div className="font-mono p-12">
      <h1 className="text-3xl font-bold mb-4">Blog Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
