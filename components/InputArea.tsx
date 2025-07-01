
import React, { useState, useRef } from 'react';
import { AnalyzeIcon, ClearIcon, LoadingSpinner, UploadIcon } from './Icons';

interface InputAreaProps {
  onAnalyze: (texts: string[]) => void;
  onClear: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onAnalyze, onClear, isLoading }) => {
  const [text, setText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        // Split by newline, filter out empty lines, and trim whitespace
        const lines = content.split(/\r?\n/).filter(line => line.trim() !== '').map(line => line.trim());
        setText(lines.join('\n'));
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyzeClick = () => {
    const texts = text.split('\n').filter(line => line.trim() !== '');
    if (texts.length > 0) {
      onAnalyze(texts);
    }
  };

  const handleClearClick = () => {
    setText('');
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
    onClear();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-slate-200">Enter Text for Analysis</h2>
      <p className="text-sm text-slate-400 mb-4">
        Enter one or more pieces of text below, with each entry on a new line. You can also upload a .txt or .csv file.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="e.g., The customer service was excellent!..."
        className="w-full h-48 p-3 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none transition duration-200 text-slate-200 resize-y"
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-wrap gap-3 justify-end">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".txt,.csv"
        />
        <button
          onClick={handleUploadClick}
          className="flex items-center justify-center px-4 py-2 bg-slate-600 text-white font-semibold rounded-md hover:bg-slate-500 transition duration-200 disabled:opacity-50"
          disabled={isLoading}
        >
          <UploadIcon />
          Upload File
        </button>
        <button
          onClick={handleClearClick}
          className="flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition duration-200 disabled:opacity-50"
          disabled={isLoading || !text}
        >
          <ClearIcon />
          Clear
        </button>
        <button
          onClick={handleAnalyzeClick}
          className="flex items-center justify-center px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? <LoadingSpinner /> : <AnalyzeIcon />}
          {isLoading ? 'Analyzing...' : 'Analyze Text'}
        </button>
      </div>
    </div>
  );
};

export default InputArea;
