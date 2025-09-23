import React from "react";

export default async function page({ params }) {
  console.log(await params);
  const { blogId } = await params;
  return (
    <div className="font-mono p-12">
      <h1>Comments Page</h1>
      <p>List of comments for blog id: {blogId}</p>
    </div>
  );
}
