export const fetchRestaurantDetails = async () => {
  const response = await fetch("/api/challenge/venue/9");
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch restaurant details: ${response.status} ${errorText}`);
  }
  return response.json();
};

export const fetchRestaurantMenu = async () => {
  const response = await fetch("/api/challenge/menu");
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch menu details: ${response.status} ${errorText}`);
  }
  return response.json();
};
