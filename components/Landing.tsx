import React from 'react';
import { StudentType } from '../types';

interface LandingProps {
  onSelect: (type: StudentType) => void;
}

export const Landing: React.FC<LandingProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-up">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center mb-6">
        Forge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Perfect Path</span>
      </h1>
      <p className="text-lg text-slate-600 text-center max-w-2xl mb-12">
        AI-powered academic guidance tailored specifically for your goals. 
        Select your current status to begin your journey.
      </p>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl px-4">
        {/* School Student Card */}
        <button
          onClick={() => onSelect('school')}
          className="group relative overflow-hidden bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-indigo-100 text-left"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">School Student</h3>
            <p className="text-slate-500">For students in K-12 looking for career exploration, subject guidance, and college prep.</p>
          </div>
          <div className="mt-6 flex items-center text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            Start Journey &rarr;
          </div>
        </button>

        {/* College Student Card */}
        <button
          onClick={() => onSelect('college')}
          className="group relative overflow-hidden bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-indigo-100 text-left"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6"/><path d="M20 2a2 2 0 0 1 2 2v2H2V4a2 2 0 0 1 2-2z"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M10 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><rect x="2" y="8" width="20" height="14" rx="2"/></svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors mb-2">College Student</h3>
            <p className="text-slate-500">For undergraduates and graduates focusing on internships, specializations, and job market readiness.</p>
          </div>
          <div className="mt-6 flex items-center text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            Start Journey &rarr;
          </div>
        </button>
      </div>
    </div>
  );
};
