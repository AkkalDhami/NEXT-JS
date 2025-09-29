import Comments from "@/components/Comments";
import Header from "@/components/Header";
import React from "react";

export const metadata = {
  title: "About ",
};

export default function page() {
  return (
    <div className="font-mono p-12">
      <Header />
      <h1>About Page</h1>
      <Comments comments={10} />
    </div>
  );
}
