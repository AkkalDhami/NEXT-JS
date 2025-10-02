import todosData from "../../../../todos.json";

export async function GET(_, { params }) {
  const { id } = await params;

  const todo = todosData.find((todo) => todo.id === Number(id));

  if (!todo) {
    return new Response(JSON.stringify({ message: "Todo Not Found" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 404,
    });
  }

  return new Response(JSON.stringify(todo), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
