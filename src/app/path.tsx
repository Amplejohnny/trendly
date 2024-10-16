"use client";

import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function Path({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isPages = pathname === "/login" || pathname === "/profile";

  return (
    <div>
      {children}
      {!isPages && <Footer />}
    </div>
  );
}
