const isProduction = process.env.NODE_ENV === "production";
const BASE_URL = isProduction
  ? "https://fernandoalmeida1.github.io/restaurant-menu" 
  : "http://localhost:5173"; 

export const fetchRestaurantDetails = async () => {
  const response = await fetch(`${BASE_URL}/api/challenge/venue/9`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch restaurant details: ${response.status} ${errorText}`);
  }
  return response.json();
};

export const fetchRestaurantMenu = async () => {
  const response = await fetch(`${BASE_URL}/api/challenge/menu`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch menu details: ${response.status} ${errorText}`);
  }
  return response.json();
};
