import { SVGProps } from "react";

const Step = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={8}
    height={8}
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 0.25C1.92893 0.25 0.25 1.92893 0.25 4C0.25 6.0711 1.92893 7.75 4 7.75C6.0711 7.75 7.75 6.0711 7.75 4C7.75 1.92893 6.0711 0.25 4 0.25Z"
      fill="currentColor"
    />
  </svg>
);

export default Step;