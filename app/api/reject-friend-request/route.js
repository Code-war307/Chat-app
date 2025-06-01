import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/db";
import FriendRequest from "@/models/friendRequest";

export async function POST(req) {
    try {
        const session = getServerSession(authOptions);
        if(!session || !session.user?.email){
            return NextResponse.json({success : false , message : 'Unauthorized'}, {status : 401});
        }

        const recieverId = session.user._id;  // current user
        const {senderId} = await req.json();

        dbConnection();

        const findFriendRequest = await FriendRequest.findOne({senderId, recieverId, status : 'pending'})

        if(!findFriendRequest){
            return NextResponse.json({success:false, message:'Friend request not found or already processed'}, {status : 404});
        }

        await FriendRequest.deleteOne({_id : findFriendRequest._id})

        return NextResponse.json({success : true, message:'Friend request rejected'}, {status : 201});

    } catch (error) {
        console.error('Reject friend error', error);
        return NextResponse.json({success:false, message:'Internal server error'}, {status: 500});
    }
}