import { getLoggedInUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    await connectDB();

    const user = await getLoggedInUser();

    if (user instanceof Response) return user;

    const existingUser = await User.findOne({ _id: user._id });

    return Response.json(
      {
        success: true,
        message: "User logged in successfully",
        user: {
          name: existingUser.name,
          email: existingUser.email,
          _id: existingUser._id,
          todos: existingUser.todos,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
