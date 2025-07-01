
import React from 'react';
import type { AnalysisResult } from '../types';
import { exportToCSV, exportToJSON, exportToPDF } from '../utils/export';
import { ExportIcon } from './Icons';

interface ExportButtonsProps {
  data: AnalysisResult[];
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
        <span className="flex items-center text-slate-400">
            <ExportIcon />
            Export Results:
        </span>
      <button
        onClick={() => exportToCSV(data)}
        className="px-3 py-1 text-sm bg-green-700 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
      >
        CSV
      </button>
      <button
        onClick={() => exportToJSON(data)}
        className="px-3 py-1 text-sm bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
      >
        JSON
      </button>
      <button
        onClick={() => exportToPDF(data)}
        className="px-3 py-1 text-sm bg-red-700 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
      >
        PDF
      </button>
    </div>
  );
};

export default ExportButtons;
