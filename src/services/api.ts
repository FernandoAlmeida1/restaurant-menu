// const isProduction = process.env.NODE_ENV === 'production';
const isProduction = true; 
console.log("Is production:", isProduction); 


export const fetchRestaurantDetails = async () => {
  if (isProduction) {
    const response = await fetch("/restaurant-menu/data/restaurantDetails.json");
    console.log("Fetching from:", response.url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch restaurant details (local): ${response.status} ${errorText}`);
    }
    return response.json();
  } else {
    const response = await fetch("/api/challenge/venue/9");
    console.log("Fetching from API:", response.url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch restaurant details (API): ${response.status} ${errorText}`);
    }
    return response.json();
  }
};

export const fetchRestaurantMenu = async () => {
  if (isProduction) {
    const response = await fetch("/restaurant-menu/data/restaurantMenu.json");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch menu details (local): ${response.status} ${errorText}`);
    }
    return response.json();
  } else {
    const response = await fetch("/api/challenge/menu");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch menu details (API): ${response.status} ${errorText}`);
    }
    return response.json();
  }
};