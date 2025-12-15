import {  Open_Sans, Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});



const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export { openSans, inter };
