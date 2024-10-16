"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Spring Sale Collections",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true); // Tracks the transition state
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // To store interval reference

  // Normal sliding effect
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

 
  const startInterval = () => {
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        if (prev === slides.length - 1) {
          setIsTransitioning(false); // Disable transition when resetting to first slide
          return 0; // Reset to first slide
        } else {
          return prev + 1; // Move to next slide
        }
      });
    }, 5000);
  };

  useEffect(() => {
    startInterval(); // Start the interval when the component mounts

    return () => clearInterval(intervalRef.current!); // Clean up on unmount
  }, []);

  useEffect(() => {
    if (!isTransitioning) {
      // If we're resetting to the first slide, re-enable transition after a brief delay
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
        startInterval(); // Restart the interval after resetting
      }, 50); // Brief delay to apply transition again
      return () => clearTimeout(timeout); // Clear timeout when component re-renders
    }
  }, [isTransitioning]);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className={`w-max h-full flex ${
          isTransitioning
            ? "transition-transform duration-1000 ease-in-out"
            : "duration-0"
        }`}
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >
            {/* TEXT CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {slide.title}
              </h1>
              <Link href={`/list?cat=all-products`}>
                <button className="rounded-md bg-black text-white py-3 px-4 ">
                  SHOP NOW
                </button>
              </Link>
            </div>
            {/* IMAGE CONTAINER */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
