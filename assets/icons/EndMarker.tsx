import { SVGProps } from "react";

const EndMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={42}
    height={67}
    viewBox="0 0 42 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.3}
      d="M21 67C24.866 67 28 65.433 28 63.5C28 61.567 24.866 60 21 60C17.134 60 14 61.567 14 63.5C14 65.433 17.134 67 21 67Z"
      fill="#18002C"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21 0C32.598 0 42 9.40202 42 21C42 31.9234 33.6599 40.8989 23 41.906V62C23 63.1046 22.1046 64 21 64C19.8954 64 19 63.1046 19 62V41.906C8.34014 40.8989 0 31.9234 0 21C0 9.40202 9.40202 0 21 0Z"
      fill="white"
    />
    <path
      d="M38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38C30.3888 38 38 30.3888 38 21Z"
      fill="#FF4A4A"
    />
    <path
      d="M28 21C28 17.134 24.866 14 21 14C17.134 14 14 17.134 14 21C14 24.866 17.134 28 21 28C24.866 28 28 24.866 28 21Z"
      fill="white"
    />
  </svg>
);

export default EndMarker;
