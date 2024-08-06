import React, { SVGAttributes } from "react";

export default function chevronDown(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L6 6L11 1"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
