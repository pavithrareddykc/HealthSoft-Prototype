import React from 'react';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
  label?: string;
}

export const Slider: React.FC<SliderProps> = ({ value, min, max, onChange, label }) => {
  return (
    <div className="w-full flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
      {label && <span className="text-xs font-bold uppercase tracking-widest">{label}</span>}
      <div className="relative w-full h-8 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer border border-black focus:outline-none"
          style={{
            background: `linear-gradient(to right, black 0%, black ${((value - min) / (max - min)) * 100}%, white ${((value - min) / (max - min)) * 100}%, white 100%)`
          }}
        />
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid black;
            cursor: pointer;
            box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
            margin-top: -8px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
          }
           input[type=range]::-webkit-slider-runnable-track {
            height: 4px;
            cursor: pointer;
            border: 1px solid black;
            border-radius: 2px;
          }
        `}</style>
      </div>
    </div>
  );
};