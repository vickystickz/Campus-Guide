import { SVGProps } from "react";

const KeepRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g>
      <path
        d="M25.3333 24.6667L23.5813 12.802C23.5464 12.5661 23.3882 12.3668 23.1664 12.2793C22.8484 12.1538 22.4918 12.2898 22.3343 12.5841L22.3016 12.6548L20.3259 17.6639L8.5324 7.41187L5.90816 10.4307L17.7017 20.6828L13.0164 23.3362C12.8348 23.4391 12.7134 23.6199 12.6848 23.8233L12.6783 23.9116C12.6759 24.2535 12.9313 24.5371 13.2626 24.5779L13.3403 24.5829L25.3333 24.6667Z"
        fill="black"
      />
    </g>
  </svg>
);

export default KeepRight;