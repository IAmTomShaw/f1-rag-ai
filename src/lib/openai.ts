// Generate vector embeddings using the openai api


import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: "YOUR_API_KEY",
});

export async function generateEmbedding(text: string) {
  const embedding = await client.embeddings.create({
    model: "text-embedding-ada-002",
    input: text
  })

  return embedding;
}

export async function generateResponse(question: string, context: string[]) {
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{
      role: "user",
      content: `You are an expert in Formula 1 racing.
      You need to answer this question using the context provided.
      Do not mention that you have been provided with the context.
      QUESTION: ${question}.
      `
    }]
  })

  return response.choices[0].message.content;

}