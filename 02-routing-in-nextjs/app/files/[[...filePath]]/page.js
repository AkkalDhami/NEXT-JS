import Link from "next/link";
import React from "react";

export default async function page({ params }) {
  const { filePath } = await params;

  return (
    <div className="font-mono p-12">
      <h1> File Page</h1>
      <p>You are viewing the file: {filePath?.join("/")}</p>
    </div>
  );
}
