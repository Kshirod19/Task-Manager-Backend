import axios from "axios";

// Define the interface for Twitch streaming data response
export interface Stream {
  id: string;
  user_name: string;
  game_name: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids?: string[]; // Optional field
}

export interface TwitchResponse {
  data: Stream[];
}

// Function to fetch streaming data from Twitch
export const fetchStreamingData = async (): Promise<Stream[]> => {
  try {
    const response = await axios.get<TwitchResponse>(
      "https://api.twitch.tv/helix/streams",
      {
        headers: {
          "Client-ID": "n03hntq4cz8ly14bdr20peknwa0j9b", // Replace with your actual Twitch client ID
        },
      }
    );

    return response.data.data; // Correctly typed: Stream[]
  } catch (error) {
    // More specific error handling
    if (error instanceof Error) {
      console.error("Error fetching streaming data:", error.message);
      throw new Error("Error fetching streaming data");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Error fetching streaming data");
    }
  }
};
