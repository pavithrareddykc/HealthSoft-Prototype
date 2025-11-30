import React, { useState, useEffect } from 'react';
import { Device, DeviceType, ViewState } from './types';
import { DeviceCard } from './components/DeviceCard';
import { BottomNav } from './components/BottomNav';
import { SmartCommandModal } from './components/SmartCommandModal';
import { LoginScreen } from './components/LoginScreen';
import { User, Bell, Mic, Menu } from 'lucide-react';

const INITIAL_DEVICES: Device[] = [
  { id: '1', name: 'Living Room Main', type: DeviceType.LIGHT, room: 'Living Room', isOn: true, value: 80 },
  { id: '2', name: 'Smart Thermostat', type: DeviceType.THERMOSTAT, room: 'Hallway', isOn: true, value: 22 },
  { id: '3', name: 'Front Door', type: DeviceType.LOCK, room: 'Entrance', isOn: false, status: 'Unlocked' },
  { id: '4', name: 'Kitchen Spots', type: DeviceType.LIGHT, room: 'Kitchen', isOn: false, value: 0 },
  { id: '5', name: 'Sonos Arc', type: DeviceType.SPEAKER, room: 'Living Room', isOn: true, status: 'Playing' },
  { id: '6', name: 'Ceiling Fan', type: DeviceType.FAN, room: 'Bedroom', isOn: true, value: 2 },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<ViewState>('home');
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Device Logic
  const handleToggle = (id: string, newState: boolean) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, isOn: newState } : d));
  };

  const handleValueChange = (id: string, newValue: number) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, value: newValue } : d));
  };

  const handleAIUpdate = (updates: Partial<Device>[]) => {
    setDevices(prev => prev.map(d => {
      const update = updates.find(u => u.id === d.id);
      return update ? { ...d, ...update } : d;
    }));
  };

  // Derived State
  const rooms = ['All', ...Array.from(new Set(devices.map(d => d.room)))];
  const filteredDevices = activeFilter === 'All' ? devices : devices.filter(d => d.room === activeFilter);
  const activeCount = devices.filter(d => d.isOn).length;

  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] text-black font-sans pb-32 flex justify-center">
      
      {/* Mobile Container Simulator */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        
        {!isAuthenticated ? (
            <LoginScreen onLogin={() => setIsAuthenticated(true)} />
        ) : (
            <>
                {/* Header */}
                <header className="px-6 pt-12 pb-6 bg-white sticky top-0 z-30 border-b-2 border-black">
                  <div className="flex justify-between items-center mb-6">
                    <div className="w-10 h-10 rounded-full border-2 border-black bg-gray-100 flex items-center justify-center">
                        <User size={20} />
                    </div>
                    <div className="flex gap-4">
                        <button className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                            <Bell size={20} />
                        </button>
                         <button className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                            <Menu size={20} />
                        </button>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-black tracking-tight mb-1">HELLO, USER.</h1>
                  <p className="text-gray-500 font-medium tracking-wide text-sm">
                    {activeCount} devices active • 21°C Indoors
                  </p>
                </header>

                {/* Content Area */}
                <main className="flex-1 px-6 pt-6 overflow-y-auto scrollbar-hide">
                  
                  {/* AI Trigger */}
                  <button 
                    onClick={() => setIsCommandOpen(true)}
                    className="w-full bg-black text-white p-6 rounded-[2rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] mb-8 flex items-center justify-between group active:translate-y-1 active:shadow-none transition-all"
                  >
                    <div className="flex flex-col items-start gap-1">
                        <span className="font-bold text-lg">Smart Command</span>
                        <span className="text-gray-400 text-sm">Tap to speak or type...</span>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                        <Mic size={24} />
                    </div>
                  </button>

                  {/* Room Filter */}
                  <div className="flex gap-3 overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide mb-2">
                    {rooms.map(room => (
                      <button
                        key={room}
                        onClick={() => setActiveFilter(room)}
                        className={`
                          whitespace-nowrap px-6 py-2 rounded-full border-2 border-black font-bold text-sm transition-all
                          ${activeFilter === room 
                            ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]' 
                            : 'bg-white text-black hover:bg-gray-50'}
                        `}
                      >
                        {room}
                      </button>
                    ))}
                  </div>

                  {/* Devices Grid */}
                  <div className="grid grid-cols-1 gap-4 pb-24">
                    {filteredDevices.map(device => (
                      <DeviceCard 
                        key={device.id} 
                        device={device} 
                        onToggle={handleToggle}
                        onValueChange={handleValueChange}
                      />
                    ))}
                    
                    {filteredDevices.length === 0 && (
                        <div className="py-10 text-center text-gray-400 font-medium">
                            No devices found in this room.
                        </div>
                    )}
                  </div>
                </main>

                <BottomNav currentView={view} onChangeView={setView} />
                
                <SmartCommandModal 
                    isOpen={isCommandOpen} 
                    onClose={() => setIsCommandOpen(false)}
                    devices={devices}
                    onUpdateDevices={handleAIUpdate}
                />
            </>
        )}
      
      </div>
    </div>
  );
}