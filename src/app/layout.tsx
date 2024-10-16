import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { WixClientContextProvider } from "@/context/wixContext";
import Path from "./path";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trendly E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WixClientContextProvider>
          <Navbar />
          <Path>{children}</Path>
        </WixClientContextProvider>
      </body>
    </html>
  );
}
