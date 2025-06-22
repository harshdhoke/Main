import React from 'react';
import { Music } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-full mb-6 border border-white/20">
          <Music className="w-10 h-10 text-purple-400 animate-pulse" />
        </div>
        
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-2">Loading Music Library</h2>
        <p className="text-white/60">Preparing your musical experience...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;