import React from 'react';

interface CrownIconProps {
  className?: string;
}

export const CrownIcon: React.FC<CrownIconProps> = ({ className = "h-6 w-6 text-amber-500" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M5,16L3,5L8.5,12L12,5L15.5,12L21,5L19,16H5M19,19A2,2 0 0,1 17,21H7A2,2 0 0,1 5,19V18H19V19Z" />
  </svg>
);