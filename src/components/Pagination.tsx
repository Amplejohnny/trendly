"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingOverlay from "./LoadingOverlay";
import { useState } from "react";

const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between w-full">
      <LoadingOverlay isLoading={isLoading} />
      <button
        className="rounded-md bg-myPink text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasPrev}
        onClick={async () => {
          setIsLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay (2s)
          createPageUrl(currentPage - 1);
          setIsLoading(false);
        }}
      >
        Previous
      </button>
      <button
        className="rounded-md bg-myPink text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasNext}
        onClick={async () => {
          setIsLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay (2s)
          createPageUrl(currentPage + 1);
          setIsLoading(false);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
