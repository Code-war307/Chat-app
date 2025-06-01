import { dbConnection } from "@/lib/db.js";
import User from "@/models/user.js";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signupSchema.js";
import { NextResponse } from "next/server";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(req) {
  await dbConnection();
  try {
    const { searchParams } = new URL(req.url);
    const queryParam = searchParams.get("username");

    // validata with zod
    const result = usernameQuerySchema.safeParse({ username: queryParam });
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message: usernameError,
          errors: usernameError,
        },
        {
          status: 400,
        }
      );
    }

    const { username } = result.data;
    // check is username is already taken
    const existingVerifiedUser = await User.findOne({$and: [ { username }, { isVerified: true } ]});
    if (existingVerifiedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is already taken. Try a new one.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Username is unique",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error checking username", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error checking username",
      },
      {
        status: 500,
      }
    );
  }
}
