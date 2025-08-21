import React from 'react'

export const SelectTravelsList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: '✈️',
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two travelers in tandem',
    icon: '🧍‍♂️🧍‍♀️',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adventurers',
    icon: '🏡',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: '⛵',
    people: '5 to 10 People',
  },
];

function GroupSizeUi({ onSelectedOption }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
      {SelectTravelsList.map((item, index) => (
        <div
          key={index}
          className="p-3 border rounded-xl bg-white shadow-sm 
                     hover:shadow-md hover:border-primary transition-all 
                     cursor-pointer flex flex-col items-center text-center gap-1"
          onClick={() => onSelectedOption(item.title + ':' + item.people)}
        >
          {/* Icon */}
          <div className="text-xl">{item.icon}</div>

          {/* Title */}
          <h2 className="text-sm font-medium text-gray-700">{item.title}</h2>

          {/* People */}
          <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {item.people}
          </span>
        </div>
      ))}
    </div>
  );
}

export default GroupSizeUi;
