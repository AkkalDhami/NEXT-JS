import todos from "../../../../todos.json";
import { writeFile } from "fs/promises";

export async function GET(_, { params }) {
  const { id } = await params;

  const todo = todos.find((todo) => todo.id === id);

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

export async function PATCH(req, { params }) {
  const { id } = await params;
  const todoFromReq = await req.json();

  if (todoFromReq.id) {
    return new Response(JSON.stringify({ message: "Cannot update todo id" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  const newTodo = {
    ...todos[todoIndex],
    ...todoFromReq,
  };
  todos[todoIndex] = newTodo;
  await writeFile("todos.json", JSON.stringify(todos, null, 4));
  return new Response(
    JSON.stringify({
      message: "Todo updated successfully",
      todo: newTodo,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    }
  );
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  console.log(id);
  const todo = todos.find((todo) => todo.id !== id);
  console.log(todo);
  if (!todo) {
    return Response.json(
      {
        message: "Todo Not Found",
      },
      {
        status: 404,
      }
    );
  }

  const newTodos = todos.filter((todo) => todo.id !== id);
  await writeFile("todos.json", JSON.stringify(newTodos, null, 4));
  return Response.json(
    {
      message: "Todo deleted successfully",
      todo,
    },
    {
      status: 200,
    }
  );
}
