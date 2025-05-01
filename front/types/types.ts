export type Client = {
  id: number;
  username: string;
  name: string;
  email: string;
  phone?: string;
  favorites: number[];
  preferences: {
    type: string;
    budget: number;
    location: string;
    bedrooms: number;
  };
};