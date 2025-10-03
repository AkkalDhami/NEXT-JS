import { connectDB } from "@/lib/db";
import Todo from "@/models/Todo";
export async function GET(req) {
  await connectDB();
  const todos = await Todo.find();
  return Response.json(todos);
}

export async function POST(req) {
  await connectDB();
  const todo = await req.json();

  const newTodo = new Todo({
    text: todo.text,
    completed: todo.completed,
  });

  await newTodo.save();

  return Response.json({
    message: "Todo created successfully",
    todo: newTodo,
  });
}
