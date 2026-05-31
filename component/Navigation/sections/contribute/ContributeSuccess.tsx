"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HeaderIcon } from "@/assets/icons";

interface ContributeSuccessProps {
  userName?: string;
  userEmail?: string;
}

export const ContributeSuccess: React.FC<ContributeSuccessProps> = ({
  userName = "youthmapperX",
  userEmail = "youthmapperX@gmail.com",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoHome = () => {
    setIsLoading(true);
    window.location.href = "/";
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8 overflow-hidden"
      style={{ backgroundImage: "url('/contribute-bg.png')" }}
    >
      <div className="w-full max-w-xl flex flex-col items-center justify-center gap-8">
        {/* Header - Logo + Text */}
        <button
          onClick={handleGoHome}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity duration-200"
        >
          <HeaderIcon size={32} />
          <span className="text-sm sm:text-lg font-normal sm:font-normal text-gray-900">
            CampusGuide
          </span>
        </button>

        {/* Success Card */}
        <div
          className="w-full max-w-sm rounded-[30px] py-8 sm:py-7 px-16 sm:px-14 flex flex-col items-center justify-center gap-6 shadow-lg"
          style={{ backgroundColor: "#EFEEF3" }}
        >
          {/* Icon Container */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center shadow-md">
            <svg
              width="63"
              height="63"
              viewBox="0 0 63 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 sm:w-16 sm:h-16"
            >
              <path
                d="M22.2073 25.7082L24.8797 24.4736L27.3489 29.8183L24.6766 31.0529L22.2073 25.7082ZM35.1629 32.6937L40.5076 30.2244L41.7422 32.8967L36.3975 35.366L35.1629 32.6937ZM29.8182 35.163L28.5836 32.4906L25.9112 33.7253L28.3805 39.0699L33.7252 36.6007L32.4906 33.9283L29.8182 35.163ZM23.8481 15.222L39.8821 7.81412L47.29 23.8481L31.2559 31.256L23.8481 15.222Z"
                fill="#8400F2"
              />
              <path
                d="M42.4151 48.7946L31.9302 47.3883L22.6228 54.6831L7.81396 22.6297L21.1757 16.4565L23.6449 21.8012L20.9726 23.0358L19.738 20.3635L11.7209 24.0674L23.7346 50.0706L31.0922 44.3041L41.3495 45.681L46.539 40.4087L50.7907 38.4444L47.0868 30.4274L44.4145 31.662L43.1798 28.9897L48.5245 26.5204L54.6977 39.8821L48.26 42.8563L42.4151 48.7946Z"
                fill="#8400F2"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center">
            Upload Successful
          </h2>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">
            Campus boundary received from{" "}
            <span className="font-semibold text-gray-900">{userName}</span>.
            We'll process your university boundary and reach back on{" "}
            <span className="font-semibold text-gray-900">{userEmail}</span> on
            your upload status.
          </p>
        </div>

        {/* Go Home Button */}
        <button
          onClick={handleGoHome}
          disabled={isLoading}
          className="px-14 sm:px-16 py-3 sm:py-2.5 rounded-full font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed text-sm sm:text-base"
          style={{ backgroundColor: "#992BF4" }}
        >
          {isLoading ? "Going Home..." : "Go Home"}
        </button>
      </div>
    </div>
  );
};

export default ContributeSuccess;
