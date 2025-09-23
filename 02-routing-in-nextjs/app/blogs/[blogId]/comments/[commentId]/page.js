import React from "react";

export default async function page({ params }) {
  const { blogId, commentId } = await params;
  return (
    <div className="font-mono p-12">
      <h1>Comment - {commentId} Page</h1>
      <p>List of comments for blog id: {blogId}</p>
      <p>Comment Id: {commentId}</p>
    </div>
  );
}
