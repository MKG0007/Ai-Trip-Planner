import React from 'react'

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '💵',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: "Don't worry about cost",
    icon: '💸',
    color: 'bg-purple-100 text-purple-600',
  },
];

function BudgetUi({ onSelectedOption }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
      {SelectBudgetOptions.map((item, index) => (
        <div
          key={index}
          className="p-3 border rounded-xl bg-white shadow-sm 
                     hover:shadow-md hover:border-primary transition-all 
                     cursor-pointer flex flex-col items-center text-center gap-1"
          onClick={() => onSelectedOption(item.title + ':' + item.desc)}
        >
          {/* Icon with colored background */}
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-lg ${item.color}`}
          >
            {item.icon}
          </div>

          {/* Title */}
          <h2 className="text-sm font-medium text-gray-700">{item.title}</h2>

          {/* Description */}
          <p className="text-[11px] text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default BudgetUi;
