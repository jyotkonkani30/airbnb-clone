import type { Listing } from "@/types/listing";

const image = (id: string, itemId: number, query: string, alt: string) => ({
  id,
  itemId,
  src: `https://images.unsplash.com/${query}&auto=format&fit=crop&w=1600&q=85`,
  alt,
});

export const listing: Listing = {
  title: "Romantic Jacuzzi 1BHK Kandolim | Mirashya UG10",
  location: "Candolim, Goa, India",
  propertyType: "Entire serviced apartment",
  rating: 4.95,
  reviews: 19,
  guests: 3,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  price: 5680,
  host: "Mirashya Homes",
  hostYears: 2,
  description:
    "Welcome to a romantic 1BHK serviced apartment in the heart of Candolim. Relax in your private jacuzzi after a day at the beach, cook an easy meal in the fully equipped kitchen, and enjoy a comfortable, thoughtfully designed stay close to Goa's best restaurants and shores.",
  amenities: ["Kitchen", "Dedicated workspace", "Pool", "Pets allowed", "Wifi", "Free parking on premises", "Hot tub", "Exterior security cameras on property", "Smoke alarm", "Air conditioning", "TV", "Washer"],
  highlights: [
    { title: "Outdoor entertainment", detail: "The pool and all-weather area are great for summer trips.", icon: "sun" },
    { title: "Designed for staying cool", detail: "Beat the heat with the A/C and ceiling fan.", icon: "snow" },
    { title: "Self check-in", detail: "You can check in with the building staff.", icon: "key" },
  ],
  sleeping: [
    { title: "Bedroom", detail: "1 double bed", src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.1.0&auto=format&fit=crop&w=1000&q=85" },
    { title: "Living room", detail: "1 sofa", src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.1.0&auto=format&fit=crop&w=1000&q=85" },
  ],
  reviewsList: [
    { name: "Aarav", date: "March 2026", text: "Beautiful apartment, spotless rooms, and the jacuzzi was the perfect touch after exploring Candolim.", rating: 5, avatar: "https://i.pravatar.cc/100?img=12" },
    { name: "Meera", date: "February 2026", text: "Great location close to the beach and restaurants. The hosts were helpful and quick to respond.", rating: 5, avatar: "https://i.pravatar.cc/100?img=47" },
    { name: "Daniel", date: "January 2026", text: "A comfortable base for a Goa trip with thoughtful amenities and a very easy check-in.", rating: 4.9, avatar: "https://i.pravatar.cc/100?img=33" },
  ],
  nearby: [
    { name: "Modern stay near Candolim beach", location: "Candolim, Goa", price: 4200, rating: 4.8, src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=85" },
    { name: "Sunny apartment with pool", location: "Calangute, Goa", price: 5100, rating: 4.9, src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=85" },
    { name: "Quiet tropical retreat", location: "Sinquerim, Goa", price: 6300, rating: 4.7, src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.1.0&auto=format&fit=crop&w=900&q=85" },
  ],
  photos: [
    image("hero", 1000, "photo-1560185008-b033106af5c3?ixlib=rb-4.1.0", "Bedroom with a romantic jacuzzi"),
    image("living", 1001, "photo-1555041469-a586c61ea9bc?ixlib=rb-4.1.0", "Bright living room with a sofa"),
    image("pool", 1002, "photo-1564501049412-61c2a3083791?ixlib=rb-4.1.0", "Shared pool beside the apartment"),
    image("bath", 1003, "photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.1.0", "Clean modern bathroom"),
    image("kitchen", 1004, "photo-1556912167-f556f1f39fdf?ixlib=rb-4.1.0", "Fully equipped kitchen"),
    image("terrace", 1005, "photo-1520250497591-112f2f40a3f4?ixlib=rb-4.1.0", "Sunny terrace and outdoor seating"),
    image("detail", 1006, "photo-1505693416388-ac5ce068fe85?ixlib=rb-4.1.0", "Bedroom details and soft linens"),
    image("building", 1007, "photo-1540541338287-41700207dee6?ixlib=rb-4.1.0", "Apartment building exterior"),
  ],
};
