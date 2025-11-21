import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/db"
import { Quiz } from "../../lib/definition";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = await db.collection<Quiz>(`${process.env.QUIZ_COLLECTION_NAME}`);

    const quizes = await collection.find({}).toArray();

    if (!quizes) return NextResponse.json({ error: "Quizes not found." }, { status: 404 });

    return NextResponse.json(quizes);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}