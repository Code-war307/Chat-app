
import { dbConnection } from "@/lib/db.js";
import { sendVerificationEmail } from "@/lib/send-email.js";
import User from "@/models/user.js";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    dbConnection();

    try {
        const {username, email, password} = await request.json();

        // check password length
        if(password.length < 6) {
            return NextResponse.json({success : false, message: "Password must be at least 6 characters"}, {status: 400});
        }

        // check if new user or old user
        const existingUserEmail = await User.findOne({email});
        const verify_code = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit code
        if(existingUserEmail){
            if(!existingUserEmail.isVerified) {
                existingUserEmail.verifyCode = verify_code;
                existingUserEmail.validityOfCode = Date.now() + 4 * 60 * 1000; // 4 minutes
                // existingUserEmail.userVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000 * 365; // 1 year
                await existingUserEmail.save();
            }
            if(existingUserEmail.isVerified) {
                return NextResponse.json({success : false, message: "You have already account.Please login !!!"}, {status: 400});
            }
        }
        else{
            // new user signup
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                verifyCode: verify_code,
                validityOfCode: Date.now() + 4 * 60 * 1000, // 4 minutes
                // userVerificationExpiry: Date.now() + 24 * 60 * 60 * 1000 * 365, // 1 year
            });
            await newUser.save();
        }

        // send verification code to email resend email
        const { success, message } = await sendVerificationEmail({
            email,
            firstName: username,
            otpCode: verify_code,
        });

        if (!success) {
            return NextResponse.json({success : false, message}, {status: 400});
        }

        return NextResponse.json({success : true, message: "Signup successfully"}, {status: 200});
    } catch (error) {
        console.error("Error in signup:", error);
        return NextResponse.json({success : false, message: "Internal server error"}, {status: 500});
    }
}