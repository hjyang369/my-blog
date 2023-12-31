import * as React from "react";

type likeProps = {
  width: string;
  height: string;
  isFill: boolean;
};

const IC_Like = ({ width, height, isFill }: likeProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_4868)">
      <path
        d="M13.35 20.13C12.59 20.82 11.42 20.82 10.66 20.12L10.55 20.02C5.29997 15.27 1.86997 12.16 1.99997 8.28001C2.05997 6.58001 2.92997 4.95001 4.33997 3.99001C6.97997 2.19001 10.24 3.03001 12 5.09001C13.76 3.03001 17.02 2.18001 19.66 3.99001C21.07 4.95001 21.94 6.58001 22 8.28001C22.14 12.16 18.7 15.27 13.45 20.04L13.35 20.13Z"
        fill={isFill ? "#fc8e8e" : "#dadada"}
      />
    </g>
    <defs>
      <clipPath id="clip0_1_4868">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default IC_Like;
