import { SVGProps, useEffect, useState } from "react";

const MyLocation = (props: SVGProps<SVGSVGElement>) => {
  const [opacity, setOpacity] = useState(0.0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (opacity === 0.3) {
        setOpacity(0.0);
        return;
      } else {
        setOpacity(opacity + 0.3);
      }
    }, 420);
    return () => clearTimeout(timer);
  }, [opacity]);
  
  return (
    <svg
      width={46}
      height={46}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.9119 11.7017C4.8854 18.1644 5.23902 28.2889 11.7017 34.3154C18.1644 40.3418 28.2889 39.9882 34.3153 33.5255C40.3418 27.0628 39.9882 16.9384 33.5255 10.9119C27.0628 4.88542 16.9384 5.23904 10.9119 11.7017Z"
        fill="#B86BF7"
        fillOpacity={opacity}
      />
      <path
        d="M16.9967 17.376C14.104 20.4781 14.2737 25.3378 17.3758 28.2305C20.4779 31.1232 25.3377 30.9535 28.2304 27.8514C31.1231 24.7493 30.9533 19.8896 27.8512 16.9968C24.7492 14.1041 19.8894 14.2739 16.9967 17.376Z"
        fill="white"
      />
      <path
        d="M17.9329 18.2489C15.5223 20.834 15.6637 24.8838 18.2488 27.2944C20.8339 29.7049 24.8836 29.5635 27.2942 26.9784C29.7048 24.3933 29.5634 20.3436 26.9783 17.933C24.3932 15.5224 20.3434 15.6638 17.9329 18.2489Z"
        fill="#992BF4"
      />
    </svg>
  );
};

export default MyLocation;
