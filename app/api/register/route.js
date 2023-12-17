import { NextResponse } from "next/server";
import db from "config/mongoose";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 1);
        await User.create({ name, email, password: hashedPassword });
        return NextResponse.json({ message: "User registered", }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "An error occured while registering user" }, { status: 500 });
    }
}