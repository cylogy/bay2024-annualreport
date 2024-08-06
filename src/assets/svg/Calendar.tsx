import React, { SVGAttributes } from 'react';

export default function Calendar(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.66669 0.833313C7.12692 0.833313 7.50002 1.20641 7.50002 1.66665V2.49998H12.5V1.66665C12.5 1.20641 12.8731 0.833313 13.3334 0.833313C13.7936 0.833313 14.1667 1.20641 14.1667 1.66665V2.49998H15.8334C17.2141 2.49998 18.3334 3.61927 18.3334 4.99998V16.6666C18.3334 18.0474 17.2141 19.1666 15.8334 19.1666H4.16669C2.78598 19.1666 1.66669 18.0474 1.66669 16.6666V4.99998C1.66669 3.61927 2.78598 2.49998 4.16669 2.49998H5.83335V1.66665C5.83335 1.20641 6.20645 0.833313 6.66669 0.833313ZM5.83335 4.16665H4.16669C3.70645 4.16665 3.33335 4.53974 3.33335 4.99998V7.49998H16.6667V4.99998C16.6667 4.53974 16.2936 4.16665 15.8334 4.16665H14.1667V4.99998C14.1667 5.46022 13.7936 5.83331 13.3334 5.83331C12.8731 5.83331 12.5 5.46022 12.5 4.99998V4.16665H7.50002V4.99998C7.50002 5.46022 7.12692 5.83331 6.66669 5.83331C6.20645 5.83331 5.83335 5.46022 5.83335 4.99998V4.16665ZM16.6667 9.16665H3.33335V16.6666C3.33335 17.1269 3.70645 17.5 4.16669 17.5H15.8334C16.2936 17.5 16.6667 17.1269 16.6667 16.6666V9.16665Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.66669 0.833313C7.12692 0.833313 7.50002 1.20641 7.50002 1.66665V2.49998H12.5V1.66665C12.5 1.20641 12.8731 0.833313 13.3334 0.833313C13.7936 0.833313 14.1667 1.20641 14.1667 1.66665V2.49998H15.8334C17.2141 2.49998 18.3334 3.61927 18.3334 4.99998V16.6666C18.3334 18.0474 17.2141 19.1666 15.8334 19.1666H4.16669C2.78598 19.1666 1.66669 18.0474 1.66669 16.6666V4.99998C1.66669 3.61927 2.78598 2.49998 4.16669 2.49998H5.83335V1.66665C5.83335 1.20641 6.20645 0.833313 6.66669 0.833313ZM5.83335 4.16665H4.16669C3.70645 4.16665 3.33335 4.53974 3.33335 4.99998V7.49998H16.6667V4.99998C16.6667 4.53974 16.2936 4.16665 15.8334 4.16665H14.1667V4.99998C14.1667 5.46022 13.7936 5.83331 13.3334 5.83331C12.8731 5.83331 12.5 5.46022 12.5 4.99998V4.16665H7.50002V4.99998C7.50002 5.46022 7.12692 5.83331 6.66669 5.83331C6.20645 5.83331 5.83335 5.46022 5.83335 4.99998V4.16665ZM16.6667 9.16665H3.33335V16.6666C3.33335 17.1269 3.70645 17.5 4.16669 17.5H15.8334C16.2936 17.5 16.6667 17.1269 16.6667 16.6666V9.16665Z"
        fill="#253E7B"
      />
    </svg>
  );
}
