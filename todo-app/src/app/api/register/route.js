import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const user = await req.json();

    if (!user.name || !user.email || !user.password) {
      return Response.json(
        {
          success: false,
          message: "Please fill in all fields",
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User with this email already exists",
        },
        { status: 400 }
      );
    }


    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    await newUser.save();

    return Response.json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
