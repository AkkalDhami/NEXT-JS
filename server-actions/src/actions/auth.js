"use server";

import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { registerSchema } from "@/validators/auth";
import z from "zod";
import Session from "@/models/Session";
import { cookies } from "next/headers";
import { createHmacToken } from "@/lib/auth";

export async function registerUser(_, formData) {
  await connectDB();
  const { success, data, error } = registerSchema.safeParse(formData);

  if (!success) {
    console.log(z.flattenError(error).fieldErrors);
    return { success: false, errors: z.flattenError(error).fieldErrors };
  }
  const { name, email, password } = data;
  try {
    if (!name || !email || !password) {
      return {
        success: false,
        message: "Please fill in all fields",
      };
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return {
        success: false,
        errors: { email: "User with this email already exists" },
      };
    } else {
      return {
        success: false,
        errors: { name: "Something went wrong" },
      };
    }
  }
}

export async function loginUser(_, formData) {
  await connectDB();
  const cookieStore = await cookies();
  const { email, password } = formData;
  try {
    if (!email || !password) {
      return {
        success: false,
        message: "Please fill in all fields",
      };
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }
    const session = await Session.create({
      userId: existingUser._id,
    });

    const signature = createHmacToken(
      session._id.toString(),
      process.env.COOKIE_SECRET
    );

    cookieStore.set("user", `${signature}.${session._id}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return {
      success: true,
      message: "User logged in successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function logoutUser() {
  await connectDB();
  const cookieStore = await cookies();

  const sessionId = cookieStore.get("user")?.value.split(".")[1];
  cookieStore.delete("user");
  const session = await Session.findOneAndDelete({ _id: sessionId });
  console.log({ session, sessionId });
  if (!session) {
    return {
      success: false,
      message: "Session not found",
    };
  }

  return {
    success: true,
    message: "User logged out successfully",
  };
}
