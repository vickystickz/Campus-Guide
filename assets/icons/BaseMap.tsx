import { SVGProps } from "react";

const BaseMap = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 6.541V20.796M15 3.181V17.436M3 8.593C3 7.066 3 6.303 3.393 5.858C3.532 5.699 3.701 5.573 3.89 5.486C5.306 4.833 7.162 6.552 8.66 6.499C8.857 6.492 9.054 6.464 9.247 6.417C11.431 5.882 12.799 3.337 15.045 3.027C16.332 2.847 17.745 3.625 18.949 4.041C19.939 4.383 20.434 4.554 20.717 4.961C21 5.368 21 5.91 21 6.99V15.412C21 16.938 21 17.702 20.607 18.147C20.4691 18.3041 20.2998 18.4305 20.11 18.518C18.694 19.171 16.838 17.453 15.34 17.506C15.1421 17.5129 14.9454 17.5401 14.753 17.587C12.569 18.122 11.201 20.667 8.955 20.978C7.674 21.156 4.108 20.228 3.283 19.043C3 18.636 3 18.096 3 17.014V8.593Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BaseMap;