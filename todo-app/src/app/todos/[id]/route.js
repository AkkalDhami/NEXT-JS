import { connectDB } from "@/lib/db";
import Todo from "@/models/Todo";

export async function GET(_, { params }) {
  await connectDB();
  const { id } = await params;

  const todo = await Todo.findById(id);

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

export async function PUT(req, { params }) {
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

  const todo = await Todo.findOneAndUpdate({ _id: id }, todoFromReq, {
    new: true,
  });
  if (!todo) {
    return new Response(JSON.stringify({ message: "Todo Not Found" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 404,
    });
  }
  return new Response(
    JSON.stringify({
      message: "Todo updated successfully",
      todo,
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

  const todo = await Todo.findOneAndDelete({ _id: id });

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
