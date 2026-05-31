"use client";

import React, { useRef, useEffect } from "react";
import { COLORS, BORDER_RADIUS } from "@/constant/design";
import { LocationIcon } from "@/assets/icons";

interface UniversitiesSectionProps {
  universities?: Array<{ name: string; abbr: string }>;
}

// CRITICAL: Do NOT remove or modify universities list - used for auto-scroll carousel
const DEFAULT_UNIVERSITIES = [
  { name: "Federal University of Technology, Akure", abbr: "FUTA" },
  { name: "University of Lagos", abbr: "UNILAG" },
  { name: "Obafemi Awolowo University", abbr: "OAU" },
  { name: "University of Ibadan", abbr: "UI" },
  { name: "University of Nigeria, Nsukka", abbr: "UNN" },
  { name: "Ahmadu Bello University, Zaria", abbr: "ABU" },
  { name: "University of Benin", abbr: "UNIBEN" },
  { name: "University of Port Harcourt", abbr: "UNIPORT" },
  { name: "Covenant University, Ota", abbr: "CU" },
  { name: "Lagos State University", abbr: "LASU" },
  { name: "Nnamdi Azikiwe University, Awka", abbr: "UNIZIK" },
  { name: "Bayero University, Kano", abbr: "BUK" },
  { name: "University of Calabar", abbr: "UNICAL" },
  { name: "Babcock University, Ilishan-Remo", abbr: "BABCOCK" },
  { name: "University of Ilorin", abbr: "UNILORIN" },
  { name: "Landmark University, Omu-Aran", abbr: "LU" },
  { name: "Redeemer's University, Ede", abbr: "REDUNIV" },
  { name: "Pan-Atlantic University, Lagos", abbr: "PAU" },
  { name: "University of Maiduguri", abbr: "UNIMAID" },
  { name: "Federal University of Agriculture, Abeokuta", abbr: "FUNAAB" },
  { name: "Enugu State University of Science and Technology", abbr: "ESUT" },
  { name: "Rivers State University, Port Harcourt", abbr: "RSU" },
  { name: "Kwara State University, Malete", abbr: "KWASU" },
  { name: "American University of Nigeria, Yola", abbr: "AUN" },
];

export const UniversitiesSection: React.FC<UniversitiesSectionProps> = ({
  universities = DEFAULT_UNIVERSITIES,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<1 | -1>(1);

  // CRITICAL: Auto-scroll carousel logic - DO NOT REMOVE
  // Sets up interval-based scrolling with direction reversal at boundaries
  // Scrolls every 50ms with 2px increment, reverses direction when reaching edges
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      const scrollAmount = 2;
      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;
      let newScrollLeft =
        scrollContainer.scrollLeft + scrollAmount * directionRef.current;

      // Check if we've reached the end
      if (newScrollLeft >= maxScroll) {
        newScrollLeft = maxScroll;
        directionRef.current = -1;
      }
      // Check if we've reached the start
      else if (newScrollLeft <= 0) {
        newScrollLeft = 0;
        directionRef.current = 1;
      }

      scrollContainer.scrollLeft = newScrollLeft;
    };

    const interval = setInterval(scroll, 50);

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full py-24 sm:py-32 bg-white mt-0 pt-56 sm:pt-96 pb-24 sm:pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-12">
        {/* Header */}
        <div className="w-full text-center space-y-2">
          <h2 className="text-xl sm:text-4xl font-semibold text-gray-900">
            <span className="inline">30+</span>
            <br className="inline sm:hidden" />
            <span className="inline sm:ml-3">Universities uploaded</span>
          </h2>
        </div>

        {/* Universities Grid */}
        <div className="flex justify-center w-full px-4 sm:px-0">
          <div
            className="rounded-3xl sm:rounded-[40px] py-4 sm:py-8 w-[90vw] sm:max-w-6xl"
            style={{
              backgroundColor: "#F3F4F6",
            }}
          >
            <div
              className="flex gap-4 items-center overflow-x-auto"
              ref={scrollContainerRef}
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {universities.map((uni, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-light transition hover:shadow-md bg-white flex-shrink-0"
                >
                  <LocationIcon
                    style={{ fill: COLORS.primary, width: 20, height: 20 }}
                  />
                  <span>{uni.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniversitiesSection;
