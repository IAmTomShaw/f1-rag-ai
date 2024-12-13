

import { createCollection, uploadData } from "./lib/db";
import { generateEmbedding } from "./lib/openai";
import { scrape } from "./lib/scrape";

const urls = [
  "https://en.wikipedia.org/wiki/Formula_One",
  "https://en.wikipedia.org/wiki/George_Russell_(racing_driver)",
];

async function ingest() {
   
  let chunks: { text: string, $vector: number[], url: string }[] = [];

  await (Promise.all(urls.map(async (url) => {
    let data = await scrape(url);

    const embeddings = await Promise.all(data.map(async (doc, index) => {
      const embedding = await generateEmbedding(doc.pageContent);
      return embedding;
    }));

    chunks = chunks.concat(data.map((doc, index) => {
      return {
        text: doc.pageContent,
        $vector: embeddings[index].data[0].embedding,
        url: url
      }
    }));
  })));

  await createCollection();
  
  await uploadData(chunks.map((doc, index) => {
    return {
      $vector: doc.$vector,
      text: doc.text,
      source: doc.url
    }
  }));
}

ingest();



