import todos from "../../../todos.json";

const { writeFile } = require("fs/promises");

export function GET(req) {
  return new Response(JSON.stringify(todos), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}

export async function POST(req) {
  const todo = await req.json();
  const newTodo = {
    id: crypto.randomUUID(),
    completed: false,
    ...todo,
  };
  todos.push(newTodo);
  await writeFile("todos.json", JSON.stringify(todos, null, 4));
  return Response.json({
    message: "Todo created successfully",
    todo: newTodo,
  });
}
