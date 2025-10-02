import todosData from "../../../todos.json";

export function GET(req) {
  console.log(req);
  //   return Response.json(todosData);

  return new Response(JSON.stringify(todosData), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
}
