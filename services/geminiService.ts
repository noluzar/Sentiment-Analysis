
import { GoogleGenAI } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildPrompt = (texts: string[]): string => {
  const jsonStructure = `{
    "originalText": "The original text being analyzed",
    "sentiment": "Positive" | "Negative" | "Neutral",
    "confidence": 0.95,
    "keywords": [
      {"word": "amazing", "sentiment": "Positive"}
    ],
    "explanation": "A brief explanation of why this sentiment was assigned."
  }`;

  const stringifiedTexts = JSON.stringify(texts);

  return `
    You are an expert sentiment analysis AI. Analyze the following array of texts:
    ${stringifiedTexts}

    Return the analysis as a single JSON array, where each object corresponds to a text in the input array.
    Each object in the array MUST strictly follow this structure:
    ${jsonStructure}
  `;
};

export const analyzeSentimentBatch = async (texts: string[]): Promise<AnalysisResult[]> => {
  if (texts.length === 0) {
    return [];
  }

  try {
    const prompt = buildPrompt(texts);
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    if (Array.isArray(parsedData)) {
      // Basic validation to ensure the structure matches AnalysisResult
      return parsedData.filter(item => 
        item.originalText && item.sentiment && item.confidence !== undefined && item.keywords && item.explanation
      );
    } else {
       throw new Error("API response is not a JSON array as expected.");
    }

  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to analyze sentiment. Details: ${error.message}`);
    }
    throw new Error("An unknown error occurred during sentiment analysis.");
  }
};
