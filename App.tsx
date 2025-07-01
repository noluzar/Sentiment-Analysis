
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputArea from './components/InputArea';
import ResultsDashboard from './components/ResultsDashboard';
import { analyzeSentimentBatch } from './services/geminiService';
import type { AnalysisResult } from './types';

const App = () => {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (texts: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await analyzeSentimentBatch(texts);
      setAnalysisResults(results);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
      setAnalysisResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setAnalysisResults([]);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-8">
          <InputArea 
            onAnalyze={handleAnalyze} 
            onClear={handleClear}
            isLoading={isLoading} 
          />
          <ResultsDashboard 
            results={analysisResults} 
            isLoading={isLoading}
            error={error} 
          />
        </div>
      </main>
      <footer className="text-center p-4 mt-8 text-sm text-slate-500">
        <p>Powered by Google Gemini. UI designed by a world-class engineer.</p>
      </footer>
    </div>
  );
};

export default App;
