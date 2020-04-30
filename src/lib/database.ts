import MongoClient, { Collection, Db } from "mongodb";

const MONGODB_URI: string = process.env.MONGODB_URI as string;
const MONGODB_DBNAME: string = process.env.MONGODB_DBNAME as string;

let cachedDb: MongoClient.Db | null = null;

const connectToDatabase = async (): Promise<Db> => {
  if (cachedDb) {
    console.log("reusing cachedDb from hot container");
    return cachedDb;
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(MONGODB_DBNAME);

  cachedDb = db;
  return db;
};

const getCollection = async (
  collectionName: "goals" | "users"
): Promise<Collection> => {
  const db = await connectToDatabase();
  return db.collection(collectionName);
};

export default getCollection;
