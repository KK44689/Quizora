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
    // return users;
    return NextResponse.json(users, { status: 200 });

  } catch (e) {
    console.error('Database Error:', e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function fetchUserById(id: string): Promise<ProfileInfo | null> {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<ProfileInfo>(`${process.env.USER_COLLECTION_NAME}`);
    const user = await collection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return null;
    }

    return user;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch user by ID.');
  }
}