import { NextResponse } from "next/server";
import db from "config/mongoose";
import User from "../../../models/user";

export async function POST(req) {
    try {
        console.log("Checking if user exists");
        const { email } = await req.json();
        const user = await User.findOne({ email }).select("_id");
        console.log("user : ", user);
        return NextResponse.json({ user });
    } catch (error) {
        console.log(error);
    }
}