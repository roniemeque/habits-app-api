import { ObjectId } from "mongodb";

export const oid = (id: string | ObjectId) =>
  typeof id === "string" ? new ObjectId(id) : id;
