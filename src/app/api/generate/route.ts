import { NextRequest, NextResponse } from "next/server";
import { generateTravelPlan } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const plan = await generateTravelPlan(body);
    return NextResponse.json(plan);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
