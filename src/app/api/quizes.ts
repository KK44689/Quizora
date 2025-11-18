import { connectToDatabase } from "../lib/db"
import { Quiz } from "../lib/definition";

export async function fetchQuizes(): Promise<Quiz[] | undefined> {
  try {
    const db = await connectToDatabase();
    const collection = await db.collection<Quiz>(`${process.env.QUIZ_COLLECTION_NAME}`);

    const quizes = await collection.find({}).toArray();
    return quizes;
  } catch (e) {
    console.error(e);
  }
}