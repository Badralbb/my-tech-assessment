import { DB } from "@/db/DB";

const collection = DB.collection("my-tech-assessment");
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await collection.insertOne({
      ...body,
    });
    return Response.json({ message: "Succussfully created" });
  } catch (err) {
    return Response.json(null, { status: 400 });
  }
}
