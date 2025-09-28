import SlowRes1 from "@/components/SlowRes1";
import SlowRes2 from "@/components/SlowRes2";
import TodoItems from "@/components/TodoItems";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Page() {
  return (
    <div className="font-mono p-12">
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
