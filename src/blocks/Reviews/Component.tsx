import React from "react";
import { unstable_cache } from "next/cache";
import type { ReviewsBlock as ReviewsBlockProps } from "@/payload-types";

const StarRating: React.FC<{ rating: number; size?: "sm" | "md" | "lg" }> = ({
  rating,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

interface GoogleRatingData {
  name: string;
  rating: number;
  totalRatings: number;
}

async function fetchGoogleRating(
  placeId: string,
  apiKey: string
): Promise<GoogleRatingData | null> {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total&key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.result) {
      return {
        name: data.result.name,
        rating: data.result.rating,
        totalRatings: data.result.user_ratings_total,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching Google Places data:", error);
    return null;
  }
}

// Helper function to get cached Google rating data
function getCachedGoogleRating(placeId: string, apiKey: string) {
  return unstable_cache(
    async () => {
      return fetchGoogleRating(placeId, apiKey);
    },
    ["google-rating", placeId],
    {
      revalidate: 86400, // Cache for 24 hours
      tags: ["google-reviews"],
    }
  )();
}

export const ReviewsBlock: React.FC<ReviewsBlockProps> = async (props) => {
  const {
    title,
    googlePlaceId,
    fallbackRating,
    fallbackDescription,
    enableGoogleRating,
    reviews,
  } = props;

  let googleData: GoogleRatingData | null = null;
  let error: string | null = null;

  // Fetch Google rating data if enabled
  if (enableGoogleRating && googlePlaceId) {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (apiKey) {
      try {
        googleData = await getCachedGoogleRating(googlePlaceId, apiKey);
      } catch (err) {
        console.error("Error fetching Google rating:", err);
        error =
          err instanceof Error ? err.message : "Failed to fetch rating data";
      }
    } else {
      error = "Google Places API key not configured";
    }
  }

  // Determine which data to use for overall rating
  const displayRating = googleData?.rating || fallbackRating || 4.5;
  const displayDescription = googleData
    ? `Gebaseerd op ${googleData.totalRatings} reviews`
    : fallbackDescription || "Based on customer reviews";

  return (
    <div className="w-full mt-10 mb-10">
      {/* Title */}
      <h2 className="text-4xl md:text-6xl text-black mb-12">
        {title || "Reviews van anderen"}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Overall Rating Card */}
        <div className="bg-white border-2 border-primaryBlue rounded-xl p-8 text-center">
          <div className="text-6xl font-bold text-black mb-4">
            {displayRating.toFixed(1)}
          </div>
          <div className="mb-4 mx-auto">
            <StarRating rating={Math.round(displayRating)} size="lg" />
          </div>
          <p className="text-black text-lg">{displayDescription}</p>
          {error && (
            <p className="text-red-500 text-sm mt-2">Using fallback data</p>
          )}
        </div>

        {/* Review Cards - Always from Payload CMS */}
        {reviews &&
          reviews.length > 0 &&
          reviews.slice(0, 2).map((review, index) => (
            <div
              key={review.id || index}
              className="bg-primaryBlue rounded-xl p-8 text-white"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-1">
                  {review.reviewerName}
                </h3>
                <p className="text-white/80 text-sm">{review.reviewerTitle}</p>
              </div>

              <blockquote className="text-white mb-6 leading-relaxed">
                &ldquo;{review.reviewText}&rdquo;
              </blockquote>

              <div className="flex justify-start">
                <StarRating rating={review.rating} size="md" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
