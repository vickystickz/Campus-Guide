import { SVGProps } from "react";

const FlatStartMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={56}
    height={56}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_293_130)">
      <path
        d="M28 40C34.6274 40 40 34.6274 40 28C40 21.3726 34.6274 16 28 16C21.3726 16 16 21.3726 16 28C16 34.6274 21.3726 40 28 40Z"
        fill="white"
      />
      <path
        d="M28 34.25C31.4518 34.25 34.25 31.4518 34.25 28C34.25 24.5482 31.4518 21.75 28 21.75C24.5482 21.75 21.75 24.5482 21.75 28C21.75 31.4518 24.5482 34.25 28 34.25Z"
        fill="#992BF4"
      />
    </g>
    <defs>
      <filter
        x={0}
        y={0}
        width={56}
        height={56}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={8} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0945169 0 0 0 0 0 0 0 0 0 0.173281 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_293_130"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_293_130"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default FlatStartMarker;