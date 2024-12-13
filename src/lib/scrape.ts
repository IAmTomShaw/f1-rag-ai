// Using playwright to scrape the data from the website urls


import playwright from "playwright";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


export async function scrape(url: string) {

  // Scrape the text from the website

  const browser = await playwright.chromium.launch();

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto(url);

  const text = await page.innerText("body");
  
  text.replace(/\n/g, " ");

  await browser.close();

  // Split the text into chunks

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 100,
  });

  const output = await splitter.createDocuments([text]);

  return output;

}

