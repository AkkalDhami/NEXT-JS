import User from "@/models/User";
import { cookies } from "next/headers";
import crypto from "crypto";

export function createHmacToken(data, secret) {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const [signature, userId] = cookieStore.get("user")?.value.split(".") || [];

  const signedUserId = createHmacToken(userId, process.env.COOKIE_SECRET);
  console.log({ signedUserId, signature, userId });
  if (signedUserId !== signature) {
    return Response.json(
      {
        success: false,
        message: "Please login first",
      },
      { status: 404 }
    );
  }

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
