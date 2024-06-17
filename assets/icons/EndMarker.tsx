import { SVGProps } from "react";

const EndMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={16} cy={16} r={16} fill="white" />
    <g>
      <g>
        <path
          d="M16.0002 9.33301C17.5915 9.33301 19.1177 9.96515 20.2429 11.0904C21.3681 12.2156 22.0002 13.7417 22.0002 15.333C22.0002 17.3823 20.8829 19.0597 19.7056 20.263C19.1173 20.8576 18.4754 21.3968 17.7882 21.8737L17.5042 22.067L17.3709 22.1557L17.1196 22.3157L16.8956 22.4523L16.6182 22.6137C16.4299 22.7209 16.2169 22.7772 16.0002 22.7772C15.7835 22.7772 15.5706 22.7209 15.3822 22.6137L15.1049 22.4523L14.7582 22.239L14.6302 22.1557L14.3569 21.9737C13.6156 21.4719 12.925 20.899 12.2949 20.263C11.1176 19.059 10.0002 17.3823 10.0002 15.333C10.0002 13.7417 10.6324 12.2156 11.7576 11.0904C12.8828 9.96515 14.4089 9.33301 16.0002 9.33301ZM16.0002 13.333C15.7376 13.333 15.4775 13.3847 15.2349 13.4852C14.9922 13.5858 14.7717 13.7331 14.586 13.9188C14.4003 14.1045 14.253 14.325 14.1525 14.5676C14.052 14.8103 14.0002 15.0704 14.0002 15.333C14.0002 15.5957 14.052 15.8557 14.1525 16.0984C14.253 16.341 14.4003 16.5615 14.586 16.7472C14.7717 16.9329 14.9922 17.0803 15.2349 17.1808C15.4775 17.2813 15.7376 17.333 16.0002 17.333C16.5307 17.333 17.0394 17.1223 17.4145 16.7472C17.7895 16.3721 18.0002 15.8634 18.0002 15.333C18.0002 14.8026 17.7895 14.2939 17.4145 13.9188C17.0394 13.5437 16.5307 13.333 16.0002 13.333Z"
          fill="#992BF4"
        />
      </g>
    </g>
  </svg>
);

export default EndMarker;