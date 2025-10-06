import User from "@/models/User";
import { cookies } from "next/headers";
import crypto from "crypto";
import Session from "@/models/Session";

export function createHmacToken(data, secret) {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const [signature, sessionId] =
    cookieStore.get("user")?.value.split(".") || [];
  const signedUserId = createHmacToken(sessionId, process.env.COOKIE_SECRET);
  console.log({ signature, sessionId, signedUserId });
  if (signedUserId !== signature) {
    return Response.json(
      {
        success: false,
        message: "Please login first",
      },
      { status: 404 }
    );
  }

  if (!sessionId) {
    return Response.json(
      {
        success: false,
        message: "Please login first",
      },
      { status: 404 }
    );
  }

  const session = await Session.findOne({ _id: sessionId });
  const userId = session?.userId;

  console.log(session);

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
