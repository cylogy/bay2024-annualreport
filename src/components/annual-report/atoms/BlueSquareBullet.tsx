import React from 'react';

// Define props type
interface BlueSquareBulletProps {
  text: string; // The component expects a string as a prop named 'number'
}

const BlueSquareBullet: React.FC<BlueSquareBulletProps> = ({ text }) => {
  return (
    <span className="bullet-number relative w-[75px] h-[75px] rounded-[20px] bg-powder-blue overflow-hidden flex items-center text-white justify-center text-[2.875rem] leading-[2.875rem] font-newsreader">
      {text}
      <div className="absolute bottom-0">
        <svg
          width="75"
          height="21"
          viewBox="0 0 75 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.9781 11.8693C62.3789 11.8693 101.66 3.63068 118 0.5L118 28.3466L-43 29.5L-43 0.500014C-27.6743 4.28978 9.57732 11.8693 35.9781 11.8693Z"
            fill="#B6D158"
          />
        </svg>
      </div>
    </span>
  );
};

export default BlueSquareBullet;
