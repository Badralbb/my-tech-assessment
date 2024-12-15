import { DB } from "@/db/DB";

const collection = DB.collection("my-tech-assessment");
export async function GET() {
  try {
    const items = await collection.find({}).toArray();
    return Response.json(items);
  } catch (err) {
    return Response.json(null, { status: 400 });
  }
}
