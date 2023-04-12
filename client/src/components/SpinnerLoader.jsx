import React from 'react';

const SpinnerLoader = () => {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-3.647zm10 0l3 3.646A7.962 7.962 0 0120 12h-4a4.001 4.001 0 00-6.464-3.093l1.729 2.117A1 1 0 0012 12c0-.551.448-1 1-1a1 1 0 001-1 3.97 3.97 0 00-.307-1.525l1.729-2.117A4.001 4.001 0 0014 12h4a7.962 7.962 0 01-2 5.291z"
      ></path>
    </svg>
  );
};

export default SpinnerLoader;