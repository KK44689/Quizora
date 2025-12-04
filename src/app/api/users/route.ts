import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../lib/db";
import { ProfileInfo } from "../../lib/definition";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<ProfileInfo>(`${process.env.USER_COLLECTION_NAME}`);

    const users = await collection.find({}).toArray();
    return NextResponse.json(users, { status: 200 });

  } catch (e) {
    console.error('Database Error:', e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}