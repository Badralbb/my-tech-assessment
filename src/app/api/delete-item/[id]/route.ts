import { DB } from "@/db/DB";
import { ObjectId } from "mongodb";

const collection = DB.collection("my-tech-assessment");
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const _id = (await params).id;
  try {
    await collection.deleteOne({ _id: new ObjectId(_id) });
    return Response.json({ message: "Succussfully deleted" });
  } catch (err) {
    return Response.json(null, { status: 404 });
  }
}
