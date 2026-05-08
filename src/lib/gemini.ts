import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export const generateTravelPlan = async (data: {
  destination: string;
  duration: string;
  budget: string;
  interests: string[];
  constraints: string;
}) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an expert travel planner. Generate a detailed travel itinerary specifically tailored for a ${data.budget} budget.
    Source: ${data.source}
    Destination: ${data.destination}
    Duration: ${data.duration}
    Budget Level: ${data.budget}
    Interests: ${data.interests.join(", ")}
    Constraints: ${data.constraints}

    CRITICAL BUDGET INSTRUCTIONS:
    - If Budget is 'Backpacker': Suggest hostels, street food, and free activities. Flight prices should be low-cost carriers.
    - If Budget is 'Standard': Suggest 3-4 star hotels, local bistros, and a mix of paid/free activities.
    - If Budget is 'Luxury': Suggest 5-star resorts, fine dining, and exclusive private tours.

    Return the response in a structured JSON format with the following keys:
    - source: The source city name
    - destination: The destination name
    - summary: A brief, inspiring summary of the trip
    - flights: An array of 3 objects representing flight options consistent with a ${data.budget} budget. Each object should have:
        - type: Class name (e.g. "Economy", "Economy Plus")
        - price: Approximate price in USD
        - airline: Suggested airline
        - duration: Typical flight time
    - hotels: An array of 3 objects representing hotel options strictly matching a ${data.budget} budget, each with:
        - name: Hotel name
        - rating: Star rating (e.g., "4.5/5")
        - price: Price per night in USD
        - neighborhood: Area of the city
        - description: One-line highlight
    - itinerary: An array of objects, each with:
        - day: Number
        - theme: A catchy theme for the day
        - activities: An array of objects, each with:
            - activity: Name of activity
            - description: Brief details (ensure they fit the ${data.budget} budget)
            - location: Specific place
            - time: Morning/Afternoon/Evening
    - tips: An array of 3-5 expert travel tips for a ${data.budget} traveler
    - packing: An array of essential items

    Ensure the tone is helpful and perfectly aligned with the ${data.budget} traveler's expectations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Improved JSON extraction
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    
    const cleanJson = jsonMatch[0].trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate travel plan");
  }
};
