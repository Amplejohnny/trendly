"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const categories = [
    "All products",
    "Apparel",
    "Featured",
    "Home",
    "Accessories",
  ];

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const initialCategory = searchParams.get("cat") || "All products";
  const [currentCategory, setCurrentCategory] = useState(initialCategory);

  useEffect(() => {
    // Update the current category if the URL parameter changes
    const updatedCategory = searchParams.get("cat") || "All products";
    setCurrentCategory(updatedCategory);
  }, [searchParams]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (name === "cat") {
      // Update the category in the URL and set it as the current category
      const formattedCategory = value.toLowerCase().replace(/\s+/g, "-");
      params.set("cat", formattedCategory);
      setCurrentCategory(formattedCategory);
    } else if (name === "min" || name === "max" || name === "sort") {
      // Set min, max, and sort values in URL params and log them
      params.set(name, value);
      console.log(`Setting ${name} to`, value);
    }

    // Update URL with modified search params
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        {/* Type Filter */}
        <select
          name="type"
          title="Type"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option value="" disabled selected>
            Type
          </option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>

        {/* Min Price Filter */}
        <input
          type="text"
          name="min"
          placeholder="Min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />

        {/* Max Price Filter */}
        <input
          type="text"
          name="max"
          placeholder="Max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />

        {/* Category Filter */}
        <select
          name="cat"
          title="Category"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
          value={currentCategory}
        >
          {/* Current category appears first */}
          <option value={currentCategory.toLowerCase()}>
            {capitalizeFirstLetter(currentCategory.replace(/-/g, " "))}
          </option>
          {/* Other categories */}
          {categories
            .filter(
              (category) =>
                category.toLowerCase().replace(/\s+/g, "-") !== currentCategory
            )
            .map((category) => (
              <option
                value={category.toLowerCase().replace(/\s+/g, "-")}
                key={category}
              >
                {capitalizeFirstLetter(category)}
              </option>
            ))}
        </select>

        {/* Additional Filters Placeholder */}
        <select
          name="filter"
          title="Filter"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option value="" disabled selected>
            All Filters
          </option>
        </select>
      </div>

      {/* Sort Filter */}
      <div>
        <select
          name="sort"
          title="Sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option value="" disabled selected>
            Sort By
          </option>
          <option value="price_asc">Price (low to high)</option>
          <option value="price_desc">Price (high to low)</option>
          <option value="date_asc">Newest</option>
          <option value="date_desc">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
