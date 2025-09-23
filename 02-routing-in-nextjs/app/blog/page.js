import React from "react";

export default async function page({ params, searchParams }) {
  console.log(await params);
  //   console.log(await searchParams); //? http://localhost:3000/blog?name=akkal-dhami  {name: 'akkal-dhami'}

  return <div className="font-mono p-12">Blog Page</div>;
}
