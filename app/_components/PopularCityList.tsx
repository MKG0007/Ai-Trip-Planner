import React from "react";
import AppleCardsCarousel from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 ">
      <h2
        className="max-w-6xl mx-auto text-2xl sm:text-3xl md:text-4xl font-bold 
        text-neutral-800 dark:text-neutral-200 font-sans text-center px-4"
      >
        Popular Destinations to Visit!
      </h2>

      {/* Carousel */}
      <div className="mt-8 sm:mt-12">
        <AppleCardsCarousel items={data} />
      </div>
    </section>
  );
}

const data = [
  {
    category: "Paris, France",
    title:
      "Explore the City of Lights – Eiffel Tower, Louvre Museum, Seine River Cruises, Notre-Dame Cathedral & more unforgettable Parisian landmarks.",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
  },
  {
    category: "New York, USA",
    title:
      "Experience the energy of NYC – Times Square, Central Park strolls, Broadway shows, Statue of Liberty, and Empire State Building views.",
    src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop",
  },
  {
    category: "Tokyo, Japan",
    title:
      "Discover Tokyo – From Shibuya Crossing & cherry blossoms to sushi, tech hubs, and anime culture.",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop",
  },
  {
    category: "Rome, Italy",
    title:
      "Walk through history – Colosseum, Vatican City, Trevi Fountain, and authentic Italian cuisine everywhere.",
    src: "https://www.italyperfect.com/cdn-cgi/image/format=auto,width=1256/https://www.italyperfect.com/g/photos/upload/sml_845543004-1590582528-ip-info-rome.jpg",
  },
  {
    category: "Dubai, UAE",
    title:
      "Luxury & innovation – Burj Khalifa views, desert safaris, Palm Jumeirah beaches, Dubai Fountain show.",
    src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop",
  },
  {
    category: "India",
    title:
      "Incredible India – Taj Mahal, Jaipur palaces, Kerala backwaters, Himalayas, and colorful festivals.",
    src: "https://images.unsplash.com/photo-1545562083-c583d014b4f2?fm=jpg&q=60&w=3000",
  },
];

export default PopularCityList;
