import React from "react";

export default async function page({ params }) {
  // console.log(await params);
  const { blogId } = await params;

  return <div className="font-mono p-12">Blog Id: {blogId}</div>;
}
