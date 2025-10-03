import { connectDB } from "@/lib/db";
import Todo from "@/models/Todo";
import User from "@/models/User";
import { cookies } from "next/headers";
export async function GET(req) {
  await connectDB();
  const cookieStore = cookies();
  const userId = await cookieStore.get("user")?.value;

  if (!userId) {
    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 404 }
    );
  }

  const user = await User.findOne({ _id: userId }).populate("todos");
  return Response.json({
    success: true,
    todos: user?.todos,
  });
}

export async function POST(req) {
  const cookieStore = cookies();
  await connectDB();

  const userId = await cookieStore.get("user")?.value;
  console.log(userId);
  const user = await User.findById(userId);

  if (!user) {
    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      { status: 404 }
    );
  }

  const todo = await req.json();

  const newTodo = new Todo({
    text: todo.text,
    completed: todo.completed,
    user: user._id,
  });

  user.todos.push(newTodo._id);
  await user.save();

  await newTodo.save();

  return Response.json({
    success: true,
    message: "Todo created successfully",
    todo: newTodo,
  });
}
