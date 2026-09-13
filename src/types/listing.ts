export type Photo = {
  id: string;
  itemId: number;
  src: string;
  alt: string;
};

export type Listing = {
  title: string;
  location: string;
  propertyType: string;
  rating: number;
  reviews: number;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  price: number;
  host: string;
  hostYears: number;
  description: string;
  amenities: string[];
  highlights: { title: string; detail: string; icon: "sun" | "snow" | "key" }[];
  sleeping: { title: string; detail: string; src: string }[];
  reviewsList: { name: string; date: string; text: string; rating: number; avatar: string }[];
  nearby: { name: string; location: string; price: number; rating: number; src: string }[];
  photos: Photo[];
};
