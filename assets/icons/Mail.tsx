import { SVGProps } from "react";

const Mail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M29 9V23C29 23.5304 28.7893 24.0391 28.4142 24.4142C28.0391 24.7893 27.5304 25 27 25H5C4.46957 25 3.96086 24.7893 3.58579 24.4142C3.21071 24.0391 3 23.5304 3 23V9M29 9C29 8.46957 28.7893 7.96086 28.4142 7.58579C28.0391 7.21071 27.5304 7 27 7H5C4.46957 7 3.96086 7.21071 3.58579 7.58579C3.21071 7.96086 3 8.46957 3 9M29 9L17.138 17.212C16.8036 17.4434 16.4066 17.5673 16 17.5673C15.5934 17.5673 15.1964 17.4434 14.862 17.212L3 9"
      stroke="#3F2B50"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Mail;