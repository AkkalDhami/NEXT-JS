export default async function Page() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
    {
      next: {
        revalidate: 60,
      },
    }
  );
  const data = await res.json();


  return (
    <div className="font-mono p-12">
      <h1 className="text-2xl mb-4">Posts Page</h1>
      <ul>
        {data?.map(({ id, completed, title }, i) => (
          <li key={id} className="w-full h-full">
            <div
              className={`mb-4 bg-zinc-900 hover:bg-zinc-800 duration-150 p-4 rounded-lg`}>
              <div className="flex items-center gap-4">
                <input type="checkbox" readOnly checked={completed} />
                <h2
                  className={`text-xl font-semibold line-clamp-1 ${
                    completed ? "line-through text-zinc-500" : "text-zinc-100"
                  }`}>
                  {title}
                </h2>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
