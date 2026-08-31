import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env["MONGODB_URI"];
const DBNAME = process.env["MONGODB_NAME"];
const client = new MongoClient(URI,
    {
        serverApi: ServerApiVersion.v1
    }
)

export let getDb;

export async function connect() {
    try {
        await client.connect();
        await client.db(DBNAME).command({ ping: 1 });
        console.log("Database connected successfuly")
        getDb = client.db(DBNAME);
    } catch (err) {
        console.err("database failed to connect" + err)
    }
}
