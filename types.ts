export enum DeviceType {
  LIGHT = 'LIGHT',
  THERMOSTAT = 'THERMOSTAT',
  LOCK = 'LOCK',
  SPEAKER = 'SPEAKER',
  CAMERA = 'CAMERA',
  FAN = 'FAN'
}

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  room: string;
  isOn: boolean;
  value?: number; // e.g., brightness, temperature
  unit?: string; // e.g., %, °C
  status?: string; // e.g., "Locked", "Playing"
}

export type ViewState = 'home' | 'rooms' | 'automation' | 'settings';

export interface Scene {
  id: string;
  name: string;
  icon: string;
  color: string; // purely for reference, UI will handle B&W mapping
}