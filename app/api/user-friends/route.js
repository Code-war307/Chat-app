import User from "@/models/user.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option.js";
import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/db.js";
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnection();

    const loggedInUserId = session.user._id;

    // fetch the user document
    const currentUser = await User.findById(loggedInUserId).select("friends")

    if(!currentUser || !currentUser.friends || currentUser.friends.length === 0) {
      return NextResponse.json(
        { success: false, message: "No friends found" },
        { status: 404 }
      );
    }

    // filter out the logged-in user from the friends list
    const friends = await User.find({ _id: { $in: currentUser.friends } })
      .select(
        "-password -isVerified -createdAt -updatedAt -email -verifyCode -validityOfCode"
      )
      .lean();

    return NextResponse.json({ success: true, friends }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user friends:", error);
    return NextResponse.json(
      { message: "Failed to fetch user friends" },
      { status: 500 }
    );
  }
}
