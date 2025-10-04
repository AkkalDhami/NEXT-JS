import User from "@/models/User";
import { cookies } from "next/headers";

export async function getLoggedInUser() {
  const cookieStore = cookies();
  const userId = await cookieStore.get("user")?.value;

  if (!userId) {
    return Response.json(
      {
        success: false,
        message: "Please login first",
      },
      { status: 404 }
    );
  }
  const user = await User.findOne({ _id: userId }).populate("todos");
  if (!user) {
    return Response.json(
      {
        success: false,
        message: "Please login first",
      },
      { status: 404 }
    );
  }
  return user;
}
