


import { DataAPIClient } from "@datastax/astra-db-ts";

const client = new DataAPIClient('YOUR_TOKEN');
const db = client.db('YOUR_DB_URL');
const collection = db.collection('f1gpt');

export async function createCollection() {
  const res = await db.createCollection("f1gpt", {
    vector: {
      dimension: 1536,
      metric: "dot_product"
    }
  });
  return res
}

export async function uploadData(data: {
  $vector: number[],
  text: string
}[]) {
  return await collection.insertMany(data);
}


export async function queryDatabase(query: number[]) {
  const res = await collection.find(null, {
    sort: {
      $vector: query
    },
    limit: 10
  }).toArray();

  return res
}