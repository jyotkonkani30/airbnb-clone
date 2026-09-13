import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stunning views from a peaceful mountain retreat",
  description: "An original desktop Airbnb listing-page recreation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
