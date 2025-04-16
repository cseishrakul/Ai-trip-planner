import axios from "axios";

export const GetUnsplashImage = async (query) => {
  const API_KEY = "XQG1RnSKGWW2UXasw3M4iuCykkL1gz0ouPhGQRlL4iw";
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&client_id=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const imageUrl = response.data.results[0]?.urls?.regular;
    return imageUrl;
  } catch (error) {
    return null;
  }
};
