import { SVGProps } from "react";

const ShareRoute = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 7.33331C6 7.86375 6.21071 8.37245 6.58579 8.74753C6.96086 9.1226 7.46957 9.33331 8 9.33331C8.53043 9.33331 9.03914 9.1226 9.41421 8.74753C9.78929 8.37245 10 7.86375 10 7.33331C10 6.80288 9.78929 6.29417 9.41421 5.9191C9.03914 5.54403 8.53043 5.33331 8 5.33331C7.46957 5.33331 6.96086 5.54403 6.58579 5.9191C6.21071 6.29417 6 6.80288 6 7.33331Z"
      stroke="currentColor"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.01335 14.3233C7.83619 14.325 7.66045 14.2914 7.49642 14.2245C7.33239 14.1575 7.18335 14.0585 7.05801 13.9333L4.22868 11.1046C3.56825 10.4439 3.09296 9.62128 2.8504 8.7191C2.60783 7.81693 2.60649 6.86687 2.84652 5.96402C3.08655 5.06117 3.55951 4.23721 4.21808 3.5746C4.87665 2.912 5.69771 2.43401 6.59908 2.18848C7.50045 1.94294 8.4505 1.93848 9.35414 2.17553C10.2578 2.41259 11.0833 2.88284 11.7481 3.53923C12.4128 4.19561 12.8935 5.0151 13.142 5.91565C13.3905 6.81621 13.3981 7.76624 13.164 8.67065M10.6667 14.6666L14 11.3333M14 11.3333V14.3333M14 11.3333H11"
      stroke="currentColor"
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShareRoute;