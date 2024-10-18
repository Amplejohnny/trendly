"use client";

import Skeleton from "@/components/Skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Confetti to simulate suspense for the component
const ConfettiComponent = dynamic(() => import("react-confetti"), {
  ssr: false, // Disable server-side rendering for Confetti
  suspense: true, // Enable suspense
});

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) return;

    const timer = setTimeout(() => {
      router.push("/orders/" + orderId);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [orderId, router]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-180px)]">
      <Suspense fallback={<Skeleton />}>
        <ConfettiComponent width={2000} height={1000} />
        <h1 className="text-6xl text-green-700">Successful</h1>
        <h2 className="text-xl font-medium">We sent the invoice to your e-mail</h2>
        <h3 className="">You are being redirected to the order page...</h3>
      </Suspense>
    </div>
  );
};

export default SuccessPage;
