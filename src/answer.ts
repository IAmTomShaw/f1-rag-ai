

import { queryDatabase } from "./lib/db";
import { generateEmbedding, generateResponse } from "./lib/openai";

async function askQuestion(question: string) {

  const embedding = await generateEmbedding(question);

  const queryRes = await queryDatabase(embedding.data[0].embedding);

  const response = await generateResponse(question, queryRes.map((doc) => doc.text));

  return response;
}

askQuestion("Why are George Russell and Max Verstappen arguing after Qatar 2024?").then((res) => {
  console.log(res);
});