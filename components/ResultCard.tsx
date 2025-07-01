
import React from 'react';
import type { AnalysisResult, Keyword } from '../types';
import { Sentiment } from '../types';

interface ResultCardProps {
  result: AnalysisResult;
}

const sentimentStyles: { [key in Sentiment]: string } = {
  [Sentiment.Positive]: 'bg-positive/20 text-positive border-positive/50',
  [Sentiment.Negative]: 'bg-negative/20 text-negative border-negative/50',
  [Sentiment.Neutral]: 'bg-neutral/20 text-neutral border-neutral/50',
};

const sentimentBadgeStyles: { [key in Sentiment]: string } = {
    [Sentiment.Positive]: 'bg-positive text-green-950',
    [Sentiment.Negative]: 'bg-negative text-red-950',
    [Sentiment.Neutral]: 'bg-neutral text-yellow-950',
};

const keywordBadgeStyles: { [key in Sentiment]: string } = {
  [Sentiment.Positive]: 'bg-positive/20 text-positive',
  [Sentiment.Negative]: 'bg-negative/20 text-negative',
  [Sentiment.Neutral]: 'bg-neutral/20 text-neutral',
};

const SentimentBadge: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => (
  <span className={`px-3 py-1 text-sm font-bold rounded-full ${sentimentBadgeStyles[sentiment]}`}>
    {sentiment}
  </span>
);

const KeywordBadge: React.FC<{ keyword: Keyword }> = ({ keyword }) => (
  <span className={`px-2 py-1 text-xs font-medium rounded-md ${keywordBadgeStyles[keyword.sentiment]}`}>
    {keyword.word}
  </span>
);

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const confidencePercentage = (result.confidence * 100).toFixed(1);
  const confidenceColor = result.sentiment === Sentiment.Positive ? 'bg-positive' : result.sentiment === Sentiment.Negative ? 'bg-negative' : 'bg-neutral';

  return (
    <div className={`p-5 rounded-lg border bg-slate-800/50 ${sentimentStyles[result.sentiment]}`}>
      <blockquote className="border-l-4 pl-4 italic text-slate-400 border-slate-600 mb-4">
        "{result.originalText}"
      </blockquote>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-slate-200">Sentiment:</h3>
          <SentimentBadge sentiment={result.sentiment} />
        </div>
        
        <div className="w-full sm:w-auto">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-slate-300">Confidence</span>
            <span className="text-sm font-bold text-slate-100">{confidencePercentage}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className={`${confidenceColor} h-2.5 rounded-full`} style={{ width: `${confidencePercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-slate-300 mb-2">Sentiment Drivers (Keywords):</h4>
        <div className="flex flex-wrap gap-2">
          {result.keywords.length > 0 ? (
            result.keywords.map((kw, index) => <KeywordBadge key={index} keyword={kw} />)
          ) : (
            <p className="text-sm text-slate-400">No specific keywords identified.</p>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-slate-300 mb-2">Explanation:</h4>
        <p className="text-sm text-slate-400">{result.explanation}</p>
      </div>
    </div>
  );
};

export default ResultCard;
