import React, { useState } from "react";

interface DaysSelectUiProps {
  onSelectDays: (value: string) => void;
}

function DaysSelectUi({ onSelectDays }: DaysSelectUiProps) {
  const [days, setDays] = useState(3); // Default value = 3 days

  const updateDays = (newDays: number) => {
    if (newDays < 1) return; // Prevent 0 or negative
    setDays(newDays);
  };

  const handleSelect = () => {
    onSelectDays(`${days} ${days === 1 ? "day" : "days"}`);
  };

  return (
    <div className="flex flex-col items-center mt-6 px-2 sm:px-4">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3 text-center">
        Select Trip Duration
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white shadow-md px-4 sm:px-6 py-4 rounded-2xl border border-gray-200">
        {/* Decrement Button */}
        <button
          onClick={() => updateDays(days - 1)}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-gray-300 
                     text-xl sm:text-2xl font-bold text-gray-600 hover:bg-gray-100 transition disabled:opacity-40"
          disabled={days === 1}
        >
          -
        </button>

        {/* Days Display */}
        <div className="px-6 sm:px-8 py-2 sm:py-3 rounded-xl bg-primary/10 border border-primary 
                        text-primary font-bold text-base sm:text-lg shadow-sm text-center min-w-[100px] sm:min-w-[120px]">
          {days} {days === 1 ? "Day" : "Days"}
        </div>

        {/* Increment Button */}
        <button
          onClick={() => updateDays(days + 1)}
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-gray-300 
                     text-xl sm:text-2xl font-bold text-gray-600 hover:bg-gray-100 transition"
        >
          +
        </button>
      </div>

      {/* ✅ Select Button */}
      <button
        onClick={handleSelect}
        className="mt-4 sm:mt-5 px-4 sm:px-6 py-2 rounded-xl bg-primary text-white font-semibold shadow-md hover:bg-primary/90 transition"
      >
        Select
      </button>
    </div>
  );
}

export default DaysSelectUi;
