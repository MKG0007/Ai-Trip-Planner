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
    <div className="flex flex-col items-center mt-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">
        Select Trip Duration
      </h3>

      <div className="flex items-center gap-6 bg-white shadow-md px-6 py-4 rounded-2xl border border-gray-200">
        {/* Decrement Button */}
        <button
          onClick={() => updateDays(days - 1)}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 
                     text-2xl font-bold text-gray-600 hover:bg-gray-100 transition disabled:opacity-40"
          disabled={days === 1}
        >
          
        </button>

        {/* Days Display */}
        <div className="px-8 py-3 rounded-xl bg-primary/10 border border-primary 
                        text-primary font-bold text-lg shadow-sm text-center min-w-[120px]">
          {days} {days === 1 ? "Day" : "Days"}
        </div>

        {/* Increment Button */}
        <button
          onClick={() => updateDays(days + 1)}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 
                     text-2xl font-bold text-gray-600 hover:bg-gray-100 transition"
        >
          +
        </button>
      </div>

      {/* ✅ Select Button */}
      <button
        onClick={handleSelect}
        className="mt-5 px-6 py-2 rounded-xl bg-primary text-white font-semibold shadow-md hover:bg-primary/90 transition"
      >
        Select
      </button>
    </div>
  );
}

export default DaysSelectUi;
