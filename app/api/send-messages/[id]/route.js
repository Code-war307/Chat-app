import cloudinary from "@/lib/cloudinary";
import { dbConnection } from "@/lib/db";
import Message from "@/models/message";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({success : false, message: "Unauthorized user" }, { status: 401 });
    }

    const senderId = session.user._id;
    const { id: receiveId } = params; // Extracting the id from the request parameters
    const { text, image } = await request.json();

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    await dbConnection();

    const newMessage = new Message({
      senderId,
      receiveId,
      text,
      image : imageUrl,
    });

    await newMessage.save();

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}