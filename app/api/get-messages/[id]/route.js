import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option.js";
import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/db.js";
import Message from "@/models/message.js";

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({success: false, message: "Unauthorized user" }, { status: 401 });
    }

    await dbConnection();

    const loggedInUserId = session.user._id;
    const chatToFriend = params.id
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiveId: chatToFriend },
        { senderId: chatToFriend, receiver: loggedInUserId },
      ],
    });

    // if (messages.length === 0) {
    //   return NextResponse.json(
    //     { success : false, message: "No messages found" },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json({success : true, messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      {success : false, message: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
