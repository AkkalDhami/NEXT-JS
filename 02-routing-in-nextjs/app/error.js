"use client";

export default function Error({ error, reset }) {

  return (
    <div className="font-mono p-12 flex items-center justify-center flex-col gap-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
      <p>Try to reload the page</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        onClick={() => reset()}>
        Reload
      </button>
    </div>
  );
}
