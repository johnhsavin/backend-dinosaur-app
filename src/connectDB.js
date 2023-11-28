import { MongoClient } from "mongodb";
import { connectionString } from './secrets.js'

const client = new MongoClient(connectionString)

await client.connect()
.catch(err => console.error(err))

export const db = client.db('DinoHunters')