import { NextRequest, NextResponse } from "next/server";

interface GooglePlaceDetails {
  result: {
    name: string;
    rating: number;
    user_ratings_total: number;
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get("placeId");

    if (!placeId) {
      return NextResponse.json(
        { error: "Place ID is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Google Places API key not configured" },
        { status: 500 }
      );
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total&key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data: GooglePlaceDetails = await response.json();

    if (data.result) {
      return NextResponse.json({
        name: data.result.name,
        rating: data.result.rating,
        totalRatings: data.result.user_ratings_total,
      });
    } else {
      return NextResponse.json(
        { error: "No place found with the provided Place ID" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching Google Places data:", error);
    return NextResponse.json(
      { error: "Failed to fetch rating data" },
      { status: 500 }
    );
  }
}
