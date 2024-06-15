import { SVGProps } from "react";

const StartMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={16}
      cy={16}
      r={15}
      fill="white"
      stroke="#992BF4"
      strokeWidth={2}
    />
    <circle cx={16.0004} cy={15.9999} r={5.71429} fill="#992BF4" />
  </svg>
);

export default StartMarker;