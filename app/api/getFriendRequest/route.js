import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/db";
import FriendRequest from "@/models/friendRequest";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const receiverId = session.user._id;   // get my mongodb id so that i found my friend requests
    dbConnection();

    const friendRequests = await FriendRequest.find({
      receiverId,
      status: "pending",
    }).populate("senderId", "_id username email profilePic").sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: friendRequests },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
