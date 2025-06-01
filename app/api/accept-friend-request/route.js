import { dbConnection } from "@/lib/db";
import FriendRequest from "@/models/friendRequest";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const {senderId} = await req.json();
    const recieveremail = session.user.email;
    dbConnection();

    const user = await User.findOne({ email: recieveremail });
    const recieverId = user?._id.toString();

    console.log("Accept friend request", { senderId, recieverId });

    const findFriendRequest = await FriendRequest.findOne({ senderId, receiverId: recieverId, status: "pending" });
    if (!findFriendRequest) {
      return NextResponse.json(
        { success: false, message: "Friend request not found" },
        { status: 404 }
      );
    }

    const sender = await User.findById(senderId);
    const reciever = await User.findById(recieverId);

    if (!sender || !reciever) {
      return NextResponse.json(
        { success: false, message: "Users not found" },
        { status: 404 }
      );
    }

    // add friend to each other and prevent duplicates
    if (!sender.friends.includes(recieverId)) {
      sender.friends.push(recieverId);
      await sender.save();
    }
    if (!reciever.friends.includes(senderId)) {
      reciever.friends.push(senderId);
      await reciever.save();
    }

    // update friend request status
    findFriendRequest.status = "accepted";
    await findFriendRequest.save();

    return NextResponse.json(
      { success: true, message: "Request accepted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Accept friend error", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
