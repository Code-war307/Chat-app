import { dbConnection } from "@/lib/db";
import FriendRequest from "@/models/friendRequest";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";

export async function POST(request, {params}){
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user._id) {
            return NextResponse.json(
                { success: false, message: "Unauthorized user" },
                { status: 401 }
            );
        }

        const senderId = session.user._id;
        const  email  = params;
        dbConnection();

        const reciever = await User.findOne({ email });
        if (!reciever) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        const receiverId = reciever._id.toString();
        if(senderId === receiverId) {
            return NextResponse.json(
                { success: false, message: "Can't send request to yourself" },
                { status: 400 }
            );
        }

        const alreadyFriendOrNot = await User.findOne({senderId});
        if (alreadyFriendOrNot && alreadyFriendOrNot.friends.includes(receiverId)) {
            return NextResponse.json(
                { success: false, message: "You are already friends" },
                { status: 400 }
            );
        }

        const existingFriendRequest = await FriendRequest.findOne({
            where : {
                senderId,
                receiverId ,
                status: "pending",
            },
        });
        if (existingFriendRequest) {
            return NextResponse.json(
                { success: false, message: "Friend request already sent" },
                { status: 400 }
            );
        }

        const newFriendRequest = new FriendRequest({
            senderId,
            receiverId,
        });
        await newFriendRequest.save();
        return NextResponse.json(
            { success: true, message: "Friend request sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error adding friend:", error);
        return NextResponse.json(
            { message: "Failed to add friend" },
            { status: 500 }
        );  
    }
}