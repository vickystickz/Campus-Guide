import { SVGProps } from "react";

const ZoomIn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.893 16.92L19.973 20M9.50001 11.5H13.5M11.5 9.5V13.5M19.084 11.581C19.084 15.768 15.701 19.162 11.529 19.162C7.35601 19.162 3.97301 15.768 3.97301 11.582C3.97301 7.393 7.35601 4 11.528 4C15.701 4 19.084 7.394 19.084 11.581Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ZoomIn;