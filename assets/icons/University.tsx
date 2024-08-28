import { SVGProps } from "react";

const University = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 3.84717L1 9.84717L12 15.8472L21 10.9372V17.8472H23V9.84717M5 14.0272V18.0272L12 21.8472L19 18.0272V14.0272L12 17.8472L5 14.0272Z"
      fill="#510094"
    />
  </svg>
);

export default University;