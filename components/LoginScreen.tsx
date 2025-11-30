import React, { useState } from 'react';
import { ArrowRight, Lock, User, Hexagon } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter your credentials');
      return;
    }

    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-white p-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 border-[3px] border-black rounded-full opacity-5 pointer-events-none" />
      <div className="absolute top-40 -left-20 w-40 h-40 border-[3px] border-black rounded-full opacity-5 pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center z-10">
        <div className="mb-10">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
                <Hexagon className="text-white w-8 h-8 fill-white" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter mb-2 leading-[0.9]">MONO<br/>HOME.</h1>
            <p className="text-lg font-bold text-gray-400 tracking-wide mt-4">Smart living, simplified.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="space-y-1">
             <label className="text-xs font-bold uppercase tracking-widest ml-1">Identity</label>
             <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-black" />
                </div>
                <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border-2 border-black rounded-xl py-4 pl-12 pr-4 font-bold outline-none focus:bg-gray-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-300"
                    placeholder="username"
                />
            </div>
          </div>

          <div className="space-y-1">
             <label className="text-xs font-bold uppercase tracking-widest ml-1">Passkey</label>
             <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-black" />
                </div>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border-2 border-black rounded-xl py-4 pl-12 pr-4 font-bold outline-none focus:bg-gray-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-300"
                    placeholder="••••••••"
                />
            </div>
          </div>

          {error && (
              <div className="bg-red-50 border-2 border-red-500 text-red-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 animate-in slide-in-from-top-2">
                 <span>!</span> {error}
              </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="mt-6 bg-black text-white h-16 rounded-xl font-bold text-xl tracking-wider border-2 border-black flex items-center justify-between px-6 hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <span>{isLoading ? 'AUTHENTICATING...' : 'ACCESS'}</span>
            {!isLoading && <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </div>

      <div className="text-center py-6">
        <button type="button" className="text-xs font-bold underline decoration-2 underline-offset-4 hover:text-gray-600">
            Forgot Credentials?
        </button>
      </div>
    </div>
  );
};