import { Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function FinalUi({ viewTrip, disabled }: any) {
  return (
    <div className="flex flex-col items-center justify-center mt-6 p-4 sm:p-6 bg-white rounded-2xl shadow-md gap-4">
      
      {/* Animated Globe Icon */}
      <Globe2 className="text-primary text-3xl sm:text-4xl animate-bounce" />
      
      {/* Heading */}
      <h2 className="mt-2 sm:mt-3 text-base sm:text-lg font-semibold text-primary text-center">
         {disabled ? "✈️ Planning your dream trip..." : "✅ Your trip is ready!"}
      </h2>
      
      {/* Subtext */}
      <p className="text-gray-500 text-xs sm:text-sm text-center">
        {disabled
          ? "Gathering best destinations, activities, and travel details for you."
          : "Everything is set. Click below to view your trip details."}
      </p>
      
      {/* View Trip Button */}
      <Button
        disabled={disabled}
        onClick={viewTrip}
        className="mt-2 sm:mt-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl"
      >
        <a href = "/my-trip">
        View Trip
        </a>
      </Button>

    </div>
  );
}

export default FinalUi;
