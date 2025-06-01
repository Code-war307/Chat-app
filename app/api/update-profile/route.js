import { dbConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option.js";
import User from "@/models/user.js";
import cloudinary from "@/lib/cloudinary.js";

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    // Extract userId from session
    const userId  = session.user._id;
    const { name, bio, image } = await request.json();

    if(name){
      if (name.length < 3 || name.length > 20) {
        return NextResponse.json(
          { message: "Name must be between 3 and 20 characters" },
          { status: 400 }
        );
      }
    }

    if(bio){
      if (bio.length > 100) {
        return NextResponse.json(
          { message: "Bio must be less than 100 characters" },
          { status: 400 }
        );
      }
    }

    await dbConnection();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let profilePicUrl = user.profilePic;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "user-profile", 
      });
      profilePicUrl = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username: name,
        bio: bio,
        profilePic: profilePicUrl,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Failed to update profile. Please try agai later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
