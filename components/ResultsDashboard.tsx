
import React from 'react';
import type { AnalysisResult } from '../types';
import { Sentiment } from '../types';
import ResultCard from './ResultCard';
import SentimentChart from './SentimentChart';
import ExportButtons from './ExportButtons';

interface ResultsDashboardProps {
  results: AnalysisResult[];
  isLoading: boolean;
  error: string | null;
}

const WelcomePlaceholder: React.FC = () => (
    <div className="text-center py-16 px-6 bg-slate-800 rounded-lg border border-slate-700">
      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-slate-300">Ready for Analysis</h3>
      <p className="mt-1 text-sm text-slate-400">
        Enter some text or upload a file above to see the sentiment analysis.
      </p>
    </div>
);


const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, isLoading, error }) => {
  if (isLoading) {
    return <div className="text-center p-8">Loading results...</div>;
  }
  
  if (error) {
    return (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
        </div>
    );
  }

  if (results.length === 0) {
    return <WelcomePlaceholder />;
  }

  const sentimentCounts = results.reduce((acc, result) => {
    acc[result.sentiment] = (acc[result.sentiment] || 0) + 1;
    return acc;
  }, { [Sentiment.Positive]: 0, [Sentiment.Negative]: 0, [Sentiment.Neutral]: 0 });

  const total = results.length;

  return (
    <div className="space-y-8">
      {/* Summary and Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-100">Analysis Summary</h2>
                    <p className="text-sm text-slate-400">Overall sentiment distribution for {total} texts.</p>
                </div>
                 <ExportButtons data={results} />
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-positive/10 rounded-lg">
              <p className="text-3xl font-bold text-positive">{sentimentCounts.Positive}</p>
              <p className="text-sm font-medium text-slate-300">Positive</p>
            </div>
            <div className="p-4 bg-negative/10 rounded-lg">
              <p className="text-3xl font-bold text-negative">{sentimentCounts.Negative}</p>
              <p className="text-sm font-medium text-slate-300">Negative</p>
            </div>
            <div className="p-4 bg-neutral/10 rounded-lg">
              <p className="text-3xl font-bold text-neutral">{sentimentCounts.Neutral}</p>
              <p className="text-sm font-medium text-slate-300">Neutral</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex items-center justify-center">
          <SentimentChart data={results} />
        </div>
      </div>
      
      {/* Detailed Results Section */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-4">Detailed Results</h2>
        <div className="space-y-4">
          {results.map((result, index) => (
            <ResultCard key={index} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
