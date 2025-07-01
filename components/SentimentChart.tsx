
import React from 'react';
import type { AnalysisResult } from '../types';
import { Sentiment } from '../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SentimentChartProps {
  data: AnalysisResult[];
}

const sentimentColors = {
  [Sentiment.Positive]: '#22c55e', // green-500
  [Sentiment.Negative]: '#ef4444', // red-500
  [Sentiment.Neutral]: '#eab308', // yellow-500
};

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  const sentimentCounts = data.reduce((acc, result) => {
    acc[result.sentiment] = (acc[result.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<Sentiment, number>);

  const chartData = Object.entries(sentimentCounts).map(([name, value]) => ({
    name: name as Sentiment,
    value,
  }));

  if (chartData.length === 0) return null;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
              const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
              return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={sentimentColors[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 41, 59, 0.9)', // slate-800 with opacity
              borderColor: '#475569', // slate-600
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#cbd5e1' }} // slate-300
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SentimentChart;
