"use client";

import React from "react";
import Image from "next/image";
import { COLORS } from "@/constant/design";
import { QuickSearchIcon } from "@/assets/icons";
import CG from "@/assets/icons/CG";
import { MapIcon } from "@/assets/icons";
import Direction from "@/component/Navigation/sidebar/Direction";
import { useAppContext } from "@/lib/context/AppContext";

interface QuickSearchSectionProps {
  onExplore?: () => void;
}

export const QuickSearchSection: React.FC<QuickSearchSectionProps> = ({
  onExplore,
}) => {
  const { startMarker, endMarker } = useAppContext();
  return (
    <section className="w-full h-screen bg-white flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 pb-16 sm:pb-24">
      <div className="w-full max-w-6xl h-full flex flex-col">
        {/* Header */}
        <div className="text-center space-y-4 mb-16 pt-8 pb-2">
          <div className="flex items-center justify-center gap-4">
            <h2
              className="text-2xl font-light"
              style={{ color: COLORS.primary }}
            >
              Quick Search
            </h2>
            <QuickSearchIcon size={48} color={COLORS.primary} />
          </div>
          <h3 className="text-xl sm:text-4xl font-light text-gray-900">
            Find{" "}
            <span
              className="px-4 py-2 rounded-full border-2 inline-block"
              style={{
                backgroundColor: "#FFFBF2",
                borderColor: COLORS.accent.yellow,
                color: "black",
              }}
            >
              Buildings
            </span>{" "}
            in seconds.
          </h3>
        </div>

        {/* MOBILE LAYOUT - Image with Overlay Card */}
        <div className="flex-1 flex flex-col gap-4 sm:hidden">
          {/* Image - Mobile with Overlaid Search Card */}
          <div className="relative h-[clamp(420px,72vh,520px)] w-full rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/buildings.png"
              alt="Campus Buildings"
              fill
              sizes="(max-width: 640px) 100vw, 90vw"
              priority
              className="w-full h-full object-cover"
            />

            {/* Search Card Overlay - Top Left */}
            <div className="absolute top-5 left-5 right-5 max-w-xs overflow-visible z-50">
              <div
                className="rounded-lg p-3 shadow-lg space-y-2 overflow-visible"
                style={{
                  backgroundColor: COLORS.light.bg,
                }}
              >
                {/* Header with CG Logo */}
                <div className="mb-2">
                  <CG width={100} height={25} />
                </div>

                {/* Direction Component */}
                <div className="text-sm">
                  <Direction active={true} shouldNavigateOnClose={false} />
                </div>
              </div>
            </div>
          </div>

          {/* Go to Live Map Button - Mobile, Below Image */}
          <button
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full font-light text-white transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 mx-auto"
            style={{ backgroundColor: COLORS.primary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primaryLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary;
            }}
          >
            <MapIcon size={20} color="white" />
            Go to live map
          </button>
        </div>

        {/* DESKTOP LAYOUT - With Container and Overlay (sm and above) */}
        <div
          className="hidden sm:flex flex-1 rounded-3xl p-3 sm:p-4 border"
          style={{
            backgroundColor: "white",
            borderColor: COLORS.accent.yellow,
          }}
        >
          {/* Buildings Image */}
          <div className="relative h-[clamp(500px,72vh,620px)] w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/buildings.png"
              alt="Campus Buildings"
              fill
              sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 600px"
              priority
              className="w-full h-full object-cover"
            />

            {/* Search Card Overlay */}
            <div className="absolute top-4 left-4 sm:left-6 sm:right-auto sm:w-80 overflow-visible z-50">
              <div
                className="rounded-xl p-4 shadow-lg space-y-3 overflow-visible"
                style={{
                  backgroundColor: COLORS.light.bg,
                }}
              >
                {/* Header with CG Logo */}
                <div className="mb-3">
                  <CG width={120} height={30} />
                </div>

                {/* Direction Component */}
                <div className="text-sm">
                  <Direction active={true} shouldNavigateOnClose={false} />
                </div>
              </div>
            </div>

            {/* Go to Live Map Button - Bottom Left Overlay */}
            <div className="absolute bottom-6 left-6 sm:left-8">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-light text-white transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                style={{ backgroundColor: COLORS.primary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primaryLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primary;
                }}
              >
                <MapIcon size={20} color="white" />
                Go to live map
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickSearchSection;
