import { getLoggedInUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Todo from "@/models/Todo";
import User from "@/models/User";
import { cookies } from "next/headers";
export async function GET() {
  await connectDB();
  const user = await getLoggedInUser();

  if (user instanceof Response) {
    return user;
  }

  return Response.json({
    success: true,
    todos: user?.todos || [],
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
        message: "Please login first",
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
