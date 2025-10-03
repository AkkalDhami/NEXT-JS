import { connectDB } from "@/lib/db";
import User from "@/models/User";

import argon2 from "argon2";
import { cookies } from "next/headers";

export async function POST(req) {
  const cookieStore = cookies();
  try {
    await connectDB();
    const user = await req.json();

    if (!user.email || !user.password) {
      return Response.json(
        {
          success: false,
          message: "Please fill in all fields",
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: user.email });
    console.log("Existing user:", existingUser);
    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 400 }
      );
    }

    const isValidPassword = await argon2.verify(
      existingUser.password,
      user.password
    );

    if (!isValidPassword) {
      return Response.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 400 }
      );
    }

    cookieStore.set("user", existingUser?._id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

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
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
