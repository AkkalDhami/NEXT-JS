import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { blogId } = await params;
  return {
    title: `Blog | ${blogId}`,
  };
}

export default async function page({ params }) {
  console.log(await params);
  const { blogId } = await params;

  if (!/^\d+$/.test(blogId)) {
    notFound();
  }

  return (
    <div className="font-mono p-12">
      <h1>Blog Id: {blogId}</h1>
      <p>See the Comments</p>
      <ul className="list-disc list-inside mt-4">
        <li>
          <Link
            href={`/blogs/${blogId}/comments`}
            className="text-blue-500 hover:underline">
            Blog Comments
          </Link>
        </li>
      </ul>
    </div>
  );
}
