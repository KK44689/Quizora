import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/db";
import { ProfileInfo } from "../lib/definition";

export async function fetchUsers() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection<ProfileInfo>(`${process.env.USER_COLLECTION_NAME}`);

    const users = await collection.find({}).toArray();
    return users;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch users data.');
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