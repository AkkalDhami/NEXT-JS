import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/context/ThemeContext";


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "My Next.js App",
    template: "%s | My Next.js App",
  },
  description: "A simple Next.js application with routing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${geistMono.variable} bg-white text-black dark:bg-zinc-950 dark:text-white font-mono p-12 antialiased`}>
        <ThemeProvider> {children}</ThemeProvider>
      </body>
    </html>
  );
}
