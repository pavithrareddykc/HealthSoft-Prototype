import React from 'react';
import { Device, DeviceType } from '../types';
import { Switch } from './ui/Switch';
import { Slider } from './ui/Slider';
import { Lightbulb, Thermometer, Lock, Music, Video, Fan } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  onToggle: (id: string, newState: boolean) => void;
  onValueChange: (id: string, newValue: number) => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle, onValueChange }) => {
  const getIcon = () => {
    switch (device.type) {
      case DeviceType.LIGHT: return <Lightbulb size={24} className={device.isOn ? "fill-black text-black" : "text-black"} />;
      case DeviceType.THERMOSTAT: return <Thermometer size={24} className="text-black" />;
      case DeviceType.LOCK: return <Lock size={24} className={device.isOn ? "fill-black text-black" : "text-black"} />;
      case DeviceType.SPEAKER: return <Music size={24} className="text-black" />;
      case DeviceType.CAMERA: return <Video size={24} className="text-black" />;
      case DeviceType.FAN: return <Fan size={24} className={device.isOn ? "animate-spin text-black" : "text-black"} />;
      default: return <Lightbulb size={24} className="text-black" />;
    }
  };

  return (
    <div className={`
      relative p-5 rounded-[2rem] border-2 border-black transition-all duration-300
      ${device.isOn ? 'bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]'}
    `}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-100 rounded-full border border-black">
          {getIcon()}
        </div>
        <Switch checked={device.isOn} onChange={(val) => onToggle(device.id, val)} />
      </div>

      <div>
        <h3 className="text-lg font-bold leading-tight">{device.name}</h3>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-4">{device.room}</p>
      </div>

      {device.type === DeviceType.LIGHT && device.isOn && (
        <div className="mt-2">
          <Slider 
            min={0} 
            max={100} 
            value={device.value || 50} 
            onChange={(val) => onValueChange(device.id, val)} 
          />
        </div>
      )}

      {device.type === DeviceType.THERMOSTAT && (
        <div className="flex items-center justify-between mt-2">
          <span className="text-3xl font-black">{device.value}°</span>
          <div className="flex flex-col gap-1">
             <button 
                onClick={() => onValueChange(device.id, (device.value || 20) + 1)}
                className="w-8 h-8 flex items-center justify-center border border-black rounded-full hover:bg-black hover:text-white transition-colors"
             >+</button>
             <button 
                onClick={() => onValueChange(device.id, (device.value || 20) - 1)}
                className="w-8 h-8 flex items-center justify-center border border-black rounded-full hover:bg-black hover:text-white transition-colors"
             >-</button>
          </div>
        </div>
      )}

       {device.type === DeviceType.LOCK && (
        <div className="mt-2 text-sm font-bold border-t border-dashed border-gray-300 pt-2">
            Status: {device.isOn ? "LOCKED" : "UNLOCKED"}
        </div>
      )}
    </div>
  );
};