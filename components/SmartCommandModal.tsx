import React, { useState, useEffect } from 'react';
import { X, Mic, Send, Sparkles, Loader2 } from 'lucide-react';
import { interpretCommand } from '../services/geminiService';
import { Device } from '../types';

interface SmartCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  devices: Device[];
  onUpdateDevices: (updates: Partial<Device>[]) => void;
}

export const SmartCommandModal: React.FC<SmartCommandModalProps> = ({ isOpen, onClose, devices, onUpdateDevices }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
        setInput('');
        setResponseMsg('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setResponseMsg('');
    
    try {
      const updates = await interpretCommand(input, devices);
      if (updates.length > 0) {
        onUpdateDevices(updates);
        setResponseMsg(`Updated ${updates.length} device(s).`);
        setTimeout(() => {
            onClose();
        }, 1500);
      } else {
        setResponseMsg("I couldn't understand that command or no devices needed changing.");
      }
    } catch (error) {
      setResponseMsg("Sorry, something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[2rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-4">
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 fill-black" />
            <h2 className="text-xl font-bold">MonoMind AI</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="min-h-[100px] flex flex-col justify-center items-center text-center gap-2 py-4">
           {isLoading ? (
               <div className="flex flex-col items-center gap-2">
                   <Loader2 className="animate-spin w-8 h-8" />
                   <p className="text-sm font-medium animate-pulse">Processing request...</p>
               </div>
           ) : responseMsg ? (
               <p className="text-lg font-medium">{responseMsg}</p>
           ) : (
               <p className="text-gray-500">Ask me to turn on lights, lock doors, or set the mood.</p>
           )}
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command..."
            className="w-full bg-gray-50 border-2 border-black rounded-full py-4 pl-6 pr-14 font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow placeholder:text-gray-400"
            autoFocus
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-black text-white rounded-full flex items-center justify-center hover:scale-95 active:scale-90 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};