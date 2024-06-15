import { SVGProps } from "react";

const Love = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <path
        d="M5.625 2.625C3.34683 2.625 1.5 4.47184 1.5 6.75C1.5 10.875 6.375 14.625 9 15.4973C11.625 14.625 16.5 10.875 16.5 6.75C16.5 4.47184 14.6532 2.625 12.375 2.625C10.9799 2.625 9.74651 3.31759 9 4.37768C8.25349 3.31759 7.02011 2.625 5.625 2.625Z"
        fill="#FF0000"
        stroke="#FF0000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default Love;