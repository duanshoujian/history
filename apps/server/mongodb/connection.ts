import { MongoClient, Collection, Document } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'talent';

let client: MongoClient;

console.log('mongodb/connection.ts')

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');
  }
  return client.db(DB_NAME);
}

export function getCollection<T extends Document>(collectionName: string): Collection<T> {
  if (!client) {
    throw new Error('Database not connected. Call connectToDatabase first.');
  }
  return client.db(DB_NAME).collection<T>(collectionName);
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
} 