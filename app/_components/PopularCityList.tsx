import React from "react";
import AppleCardsCarousel from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-4xl font-bold 
                     text-neutral-800 dark:text-neutral-200 font-sans text-center">
        Popular destination to visit!
      </h2>
      {/* ✅ Now passing raw data, not prebuilt JSX */}
      <AppleCardsCarousel items={data} />
    </div>
  );
}

const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights – Eiffel Tower, Louvre Museum, Seine River Cruises, Notre-Dame Cathedral & more unforgettable Parisian landmarks.",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
  },
  {
    category: "New York, USA",
    title: "Experience the energy of NYC – Times Square lights, Central Park strolls, Broadway shows, Statue of Liberty, and the Empire State Building views.",
    src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo – From Shibuya Crossing and cherry blossoms to traditional temples, sushi experiences, futuristic tech districts, and anime culture.",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "Rome, Italy",
    title: "Walk through history in Rome – The Colosseum, Vatican City, Roman Forum, Trevi Fountain, and authentic Italian cuisine on every charming street.",
    src: "https://www.italyperfect.com/cdn-cgi/image/format=auto,width=1256/https://www.italyperfect.com/g/photos/upload/sml_845543004-1590582528-ip-info-rome.jpg",
  },
  {
    category: "Dubai, UAE",
    title: "Luxury and innovation in Dubai – Burj Khalifa views, desert safaris, luxury shopping, Palm Jumeirah beaches, and the magical Dubai Fountain show.",
    src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    category: "India",
    title: "Incredible India – Taj Mahal’s beauty, Jaipur’s palaces, Kerala’s backwaters, Himalayan treks, vibrant festivals, and the diverse cultural heritage.",
    src: "https://images.unsplash.com/photo-1545562083-c583d014b4f2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwbW9udW1lbnR8ZW58MHx8MHx8fDA%3D",
  },
];


export default PopularCityList;
