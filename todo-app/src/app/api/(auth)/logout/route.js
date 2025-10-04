import { connectDB } from "@/lib/db";
import Session from "@/models/Session";
import { cookies } from "next/headers";

export async function POST() {
  try {
    await connectDB();
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("user")?.value.split(".")[1];
    cookieStore.delete("user");
    const session = await Session.findOneAndDelete({ _id: sessionId });
    console.log({ session, sessionId });
    if (!session) {
      return Response.json(
        {
          success: false,
          message: "Session not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User logged out successfully",
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
