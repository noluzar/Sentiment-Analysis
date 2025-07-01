
export enum Sentiment {
  Positive = 'Positive',
  Negative = 'Negative',
  Neutral = 'Neutral',
}

export interface Keyword {
  word: string;
  sentiment: Sentiment;
}

export interface AnalysisResult {
  originalText: string;
  sentiment: Sentiment;
  confidence: number;
  keywords: Keyword[];
  explanation: string;
}
