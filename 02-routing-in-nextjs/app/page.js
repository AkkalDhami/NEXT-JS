import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-mono p-12">
      <h1>Hello world</h1>

      <div className="flex gap-4 mt-4  flex-col">
        <Link href="/about" className="text-blue-500 hover:underline">
          About
        </Link>
        <Link href="/blogs" className="text-blue-500 hover:underline">
          Blogs
        </Link>
        <Link href="/service" className="text-blue-500 hover:underline">
          Service
        </Link>
        <Link href="/files" className="text-blue-500 hover:underline">
          Files
        </Link>
      </div>
    </div>
  );
}
