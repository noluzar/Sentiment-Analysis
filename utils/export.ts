
import type { AnalysisResult } from '../types';

// This function is needed because jsPDF is loaded from a script tag
declare const jspdf: any;

const escapeCSV = (field: any): string => {
  if (field === null || field === undefined) {
    return '';
  }
  const str = String(field);
  // If the string contains a comma, double quote, or newline, wrap it in double quotes
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    // Also, double up any existing double quotes
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

export const exportToCSV = (data: AnalysisResult[]) => {
  const headers = ['Original Text', 'Sentiment', 'Confidence', 'Keywords', 'Explanation'];
  const rows = data.map(item => [
    escapeCSV(item.originalText),
    escapeCSV(item.sentiment),
    escapeCSV(item.confidence),
    escapeCSV(item.keywords.map(k => k.word).join(', ')),
    escapeCSV(item.explanation),
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'sentiment_analysis_results.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data: AnalysisResult[]) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'sentiment_analysis_results.json');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = (data: AnalysisResult[]) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  doc.text('Sentiment Analysis Results', 14, 16);
  
  const tableColumn = ["Text", "Sentiment", "Confidence", "Explanation"];
  const tableRows: any[][] = [];

  data.forEach(item => {
    const ticketData = [
      item.originalText,
      item.sentiment,
      item.confidence.toFixed(2),
      item.explanation,
    ];
    tableRows.push(ticketData);
  });
  
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    headStyles: { fillColor: [22, 163, 74] },
    theme: 'grid',
    styles: {
      cellPadding: 2,
      fontSize: 8,
      overflow: 'linebreak'
    },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      3: { cellWidth: 'auto' },
    }
  });

  doc.save('sentiment_analysis_results.pdf');
};
