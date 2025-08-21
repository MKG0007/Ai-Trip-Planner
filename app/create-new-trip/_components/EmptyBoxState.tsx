import { suggestions } from '@/app/_components/Hero';
import React from 'react';

interface EmptyBoxStateProps {
  onSelectOption: (option: string) => void;
}

function EmptyBoxState({ onSelectOption }: EmptyBoxStateProps) {
  return (
    <div className="mt-6 text-center max-w-2xl mx-auto px-4 sm:px-6">
      {/* Heading */}
      <h2 className="font-bold text-2xl sm:text-3xl leading-snug">
        Start Planning Your <span className="text-primary">Trip with AI</span>
      </h2>

      {/* Subtext */}
      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        Get personalized suggestions for flights, hotels, and weekend getaways.
        Just pick one of the options below to get started 🚀
      </p>

      {/* Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {suggestions.map((s, index) => (
          <button
            key={index}
            onClick={() => onSelectOption(s.title)}
            className="flex items-center justify-center gap-2 border rounded-full 
                       px-4 py-2 text-gray-700 bg-white shadow-sm 
                       hover:bg-primary hover:text-white hover:shadow-md 
                       transition-all duration-200"
          >
            <span className="text-lg">{s.icon}</span>
            <span className="font-medium text-sm sm:text-base">{s.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
