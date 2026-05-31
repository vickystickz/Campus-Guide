"use client";

import React from "react";

interface MappingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const SLIDER_SVG_THUMB = `url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g><circle cx="24" cy="24" r="9" fill="white"/></g><circle cx="24" cy="24" r="4" fill="%23992BF4"/></svg>')`;

export const MappingSlider: React.FC<MappingSliderProps> = ({
  value,
  onChange,
}) => {
  // Calculate gradient for filled track
  const gradientBackground = `linear-gradient(to right, #992BF4 0%, #992BF4 ${value}%, rgb(229, 231, 235) ${value}%, rgb(229, 231, 235) 100%)`;

  return (
    <div className="space-y-1 sm:space-y-1">
      <label className="block text-sm sm:text-xs font-medium text-gray-900">
        How well is your campus mapped on OSM?
      </label>

      {/* Slider container with counter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <style suppressHydrationWarning>{`
            input[type="range"].gradient-slider::-webkit-slider-thumb {
              appearance: none;
              width: 24px;
              height: 24px;
              background: ${SLIDER_SVG_THUMB};
              background-position: center;
              background-repeat: no-repeat;
              background-size: contain;
              cursor: pointer;
              border: none;
              border-radius: 50%;
              box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
            }
            input[type="range"].gradient-slider::-moz-range-thumb {
              appearance: none;
              width: 24px;
              height: 24px;
              background: white;
              border: 3px solid #992BF4;
              cursor: pointer;
              border-radius: 50%;
              box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
            }
            input[type="range"].gradient-slider::-moz-range-track {
              background: transparent;
              border: none;
            }
          `}</style>
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer gradient-slider"
            style={{
              background: gradientBackground,
            }}
          />
        </div>

        {/* Fixed percentage counter at the end with white background */}
        <div
          className="flex-shrink-0 px-3 py-1.5 rounded-full font-semibold text-sm"
          style={{
            backgroundColor: "white",
            color: "#1E1E1E",
            minWidth: "50px",
            textAlign: "center",
          }}
        >
          {value}%
        </div>
      </div>
    </div>
  );
};

export default MappingSlider;
