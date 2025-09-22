import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-mono p-12">

      <h1 >Hello world</h1>

      <div className="flex gap-4 mt-4  flex-col">
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
      </div>

    </div>
  );
}
