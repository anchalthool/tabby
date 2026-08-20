import type { Metadata } from "next";
import { Fraunces, Poppins,Elms_Sans } from "next/font/google";
import "./globals.css";
import { Gaegu } from "next/font/google";

const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gaegu",
});

// Display: elegant high-contrast serif for headings.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

// Body: clean geometric sans.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const elmsSans = Elms_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Tabby",
  description: "Grocery math, minus the drama",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${elmsSans.variable} ${poppins.variable} ${gaegu.variable}`}>
  {children}
</body>
    </html>
  );
}