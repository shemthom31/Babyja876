import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-primary/10 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative mb-8">
      <div className="max-w-md z-10 text-center md:text-left">
        <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
          Jamaica's #1 Choice
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mt-4 leading-tight">
          Everyday Newborn Essentials Delivered to Your Door.
        </h1>
        <p className="mt-3 text-lg text-neutral-text opacity-80">
          Serving every parish across Jamaica with love.
        </p>
        <a 
          href="#shop"
          className="inline-block mt-6 bg-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        >
          Shop Collection
        </a>
      </div>
      <div className="hidden md:block absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="currentColor" className="text-primary" />
          <path d="M30 50 Q50 20 70 50" stroke="currentColor" fill="none" strokeWidth="2" className="text-primary" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
