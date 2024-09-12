import * as React from "react"
const Copy = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"

  >
    <g
      stroke="#D9D9D9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      clipPath="url(#a)"
    >
      <path d="M15 8H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1Z" />
      <path
        strokeDasharray="66.67 66.67"
        d="M8 6V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1"
      />
    </g>
    <defs>
      <clipPath id="a">
        <rect width={24} height={24} fill="#fff" rx={4} />
      </clipPath>
    </defs>
  </svg>
)
export default Copy
