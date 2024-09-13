const isProduction = process.env.NODE_ENV === "production";
const BASE_URL = isProduction
  ? "https://nome-do-seu-projeto.herokuapp.com"
  : "http://localhost:5173";

console.log(`BASE_URL: ${BASE_URL}`); 

export const fetchRestaurantDetails = async () => {
  const response = await fetch(`${BASE_URL}/api/challenge/venue/9`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch restaurant details: ${response.status} ${errorText}`);  // Log para depuração
    throw new Error(`Failed to fetch restaurant details: ${response.status} ${errorText}`);
  }
  return response.json();
};

export const fetchRestaurantMenu = async () => {
  const response = await fetch(`${BASE_URL}/api/challenge/menu`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch menu details: ${response.status} ${errorText}`);  // Log para depuração
    throw new Error(`Failed to fetch menu details: ${response.status} ${errorText}`);
  }
  return response.json();
};
