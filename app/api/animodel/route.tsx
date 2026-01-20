


import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";

// ✅ Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT = `
You are an AI Trip Planner Agent. 
Your goal is to help the user plan a trip by asking ONE relevant trip-related question at a time.

Step-by-step Question Flow:
1. Ask for the destination (where they want to go).
2. Ask for the origin (where they are starting from).
3. Ask for the travel dates or number of days.
4. Ask for the budget.
5. Ask for the group size (how many people).
6. Ask about preferred activities or trip style (adventure, sightseeing, cultural, food, nightlife, relaxation).
7. Ask for any special requirements or preferences. → (ui = "null")
8. Once all info is collected → mark with "ui": "final".

Output Rules:
- Always reply ONLY in this JSON schema:
{
  "resp": "Conversational question/response to user",
  "ui": "destination | origin | numberOfDays | budget | groupSize | activities | final | null"
}
- Do not include markdown, explanations, or any text outside JSON.
- If user input is unclear, ask again but always keep JSON format.
- IMPORTANT: Never output plain text outside the JSON object.
`;


const FINAL_PROMPT = `
Generate Travel Plan with given details, give me Hotels options list with HotelName,
Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, 
Geo Coordinates, Place address, ticket Pricing, Time travel each of the location, with each day plan with best time to visit in JSON format.

Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "latitude": "number",
              "longitude": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`;
export async function POST(req: NextRequest) {
  try {
    // 1. Parse request and check Auth
    const { messages, isFinal } = await req.json();
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Initialize Model with System Instructions (Cleaner than injecting into history)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: isFinal ? FINAL_PROMPT : PROMPT,
    });

    // 3. FIX: Map roles correctly (assistant -> model)
    // Gemini will throw a 500/400 error if it sees "assistant"
    const formattedHistory = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // 4. Generate Content with JSON enforcement
    const result = await model.generateContent({
      contents: formattedHistory,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text().trim();
    
    // 5. Safe Parsing
    try {
      const parsed = JSON.parse(responseText);
      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error("JSON Parse Error. Raw text:", responseText);
      return NextResponse.json({
        resp: responseText,
        ui: isFinal ? "final" : "null",
      });
    }

  } catch (e: any) {
    // This will now catch the ACTUAL Gemini error (like invalid API key or Quota)
    console.error("Gemini API Error:", e.message);
    return NextResponse.json({ error: "Internal Server Error", details: e.message }, { status: 500 });
  }
}
