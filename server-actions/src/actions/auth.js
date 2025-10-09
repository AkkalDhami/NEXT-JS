"use server";

import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { registerSchema } from "@/validators/auth";
import z from "zod";

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
      user: {
        name: newUser.name,
        email: newUser.email,
        _id: newUser._id,
        todos: newUser.todos,
      },
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

    return {
      success: true,
      message: "User logged in successfully",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        _id: existingUser._id,
        todos: existingUser.todos,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
