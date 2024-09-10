export const fetchRestaurantDetails = async () => {
  const response = await fetch("/api/challenge/venue/9");
  if (!response.ok) {
    throw new Error("Failed to fetch restaurant details");
  }
  return response.json();
};

export const testeTeste = async () => {
    const response = await fetch("/api/menu");
    if (!response.ok) {
      throw new Error("Failed to fetch menu details");
    }
    return response.json();
  };
  