import SlowRes1 from "@/components/SlowRes1";
import SlowRes2 from "@/components/SlowRes2";
import TodoItems from "@/components/TodoItems";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/Header";

async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

const urls = [
  "https://jsonplaceholder.typicode.com/todos?_limit=10",
  "https://procodrr.vercel.app/?sleep=2000",
  "https://procodrr.vercel.app/?sleep=3000",
];

export default async function Page() {
  const [data1, data2, data3] = await Promise.all(urls.map(fetchData));
  console.log(data1, data2, data3);
  return (
    <div className="font-mono p-12">
      <Header />
      <h1 className="text-2xl mb-4">Posts Page</h1>
      <div className="mb-4 space-y-3">
        <Suspense fallback={<div>Loading res1...</div>}>
          <SlowRes1 />
        </Suspense>
        <Suspense fallback={<div>Loading res2...</div>}>
          <SlowRes2 />
        </Suspense>
      </div>
      <ul>
        <Suspense fallback={<Loading />}>
          <TodoItems />
        </Suspense>
      </ul>
    </div>
  );
}
