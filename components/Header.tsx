
import React from 'react';

const Header = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-sm p-4 sticky top-0 z-20 border-b border-slate-700">
      <div className="max-w-7xl mx-auto flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h1 className="text-2xl font-bold text-slate-100">Sentiment Analysis Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;
