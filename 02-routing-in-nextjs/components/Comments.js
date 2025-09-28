"use client";

export default function Comments({ comments }) {
  if (typeof window !== "undefined")
    return <div className="font-mono p-12">Comments: {comments} client</div>;

  return <div className="font-mono p-12">Comments: {comments} client</div>;
}
