import { SVGProps } from "react";

const School = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={61}
    height={71}
    viewBox="0 0 61 71"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <g filter="url(#filter0_f_300_139)">
        <ellipse
          cx={30.5}
          cy={64}
          rx={8.5}
          ry={3}
          fill="black"
          fillOpacity={0.2}
        />
      </g>
      <g filter="url(#filter1_d_300_139)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.5 4C44.5833 4 56 15.4167 56 29.5C56 40.2983 49.2881 49.5289 39.8087 53.2475L31.9521 63.9865C31.7883 64.2113 31.5709 64.3948 31.3181 64.5215C31.0653 64.6481 30.7846 64.7143 30.4997 64.7143C30.2149 64.7143 29.9342 64.6481 29.6814 64.5215C29.4286 64.3948 29.2111 64.2113 29.0473 63.9865L21.1905 53.2472C11.7115 49.5284 5 40.298 5 29.5C5 15.4167 16.4167 4 30.5 4Z"
          fill="white"
        />
      </g>
      <path
        d="M51.9999 29.5C51.9999 17.6259 42.3741 8 30.4999 8C18.6258 8 8.99994 17.6259 8.99994 29.5C8.99994 41.3741 18.6258 51 30.4999 51C42.3741 51 51.9999 41.3741 51.9999 29.5Z"
        fill="#F3E6FE"
      />
      <g>
        <path
          d="M30 20L19 26L30 32L39 27.09V34H41V26M23 30.18V34.18L30 38L37 34.18V30.18L30 34L23 30.18Z"
          fill="#510094"
        />
      </g>
    </g>
    <defs>
      <filter
        x={20}
        y={59}
        width={21}
        height={10}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation={1}
          result="effect1_foregroundBlur_300_139"
        />
      </filter>
      <filter
        x={-4.76837e-7}
        y={-3.57628e-7}
        width={61}
        height={70.7143}
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
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={2.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_300_139"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_300_139"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default School;