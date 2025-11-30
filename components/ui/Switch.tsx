import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`
        relative w-12 h-7 rounded-full transition-all duration-300 ease-in-out border-2 border-black
        ${checked ? 'bg-black' : 'bg-white'}
      `}
      aria-label="Toggle"
    >
      <span
        className={`
          absolute top-0.5 left-0.5 w-5 h-5 rounded-full border-2 border-black transition-transform duration-300
          ${checked ? 'translate-x-5 bg-white' : 'translate-x-0 bg-black'}
        `}
      />
    </button>
  );
};