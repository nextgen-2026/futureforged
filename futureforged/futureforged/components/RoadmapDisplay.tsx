import React, { useState } from 'react';
import { GeneratedRoadmap, UserFormData } from '../types';

interface RoadmapDisplayProps {
  data: GeneratedRoadmap;
  userData: UserFormData;
  onReset: () => void;
}

export const RoadmapDisplay: React.FC<RoadmapDisplayProps> = ({ data, userData, onReset }) => {
  const [rating, setRating] = useState<number>(0);

  const downloadRoadmap = () => {
    const content = `
FUTURE FORGED ROADMAP for ${userData.name}
----------------------------------------
"${data.motivationalQuote}"

GOALS: ${userData.goals}

--- YOUR ROADMAP ---

${data.steps.map((step, idx) => `
STEP ${idx + 1}: ${step.title}
Duration: ${step.duration}
Description: ${step.description}

Resources:
${step.resources.map(r => `- ${r.title}: ${r.url}`).join('\n')}
`).join('\n\n')}

--- WEEKLY SCHEDULE ---

${data.weeklySchedule.map(day => `${day.day}: ${day.tasks.join(', ')}`).join('\n')}

--- NOTE ---
${data.securityNote}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${userData.name.replace(/\s+/g, '_')}_Roadmap.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-12">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onReset}
          className="text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors font-medium"
        >
          &larr; Start Over
        </button>
        <button
          onClick={downloadRoadmap}
          className="px-6 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Roadmap
        </button>
      </div>

      {/* Quote Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h2 className="text-2xl md:text-4xl font-extrabold italic relative z-10 font-serif">
          "{data.motivationalQuote}"
        </h2>
        <p className="mt-4 text-indigo-100 font-medium relative z-10 uppercase tracking-widest text-sm">
          Prepared for {userData.name}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Roadmap Column */}
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">1</span>
            Your Strategic Path
          </h3>
          
          <div className="relative border-l-4 border-indigo-100 ml-4 space-y-12">
            {data.steps.map((step, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white shadow-md"></div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-slate-800">{step.title}</h4>
                    <span className="text-xs font-semibold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full whitespace-nowrap">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed">{step.description}</p>
                  
                  {step.resources.length > 0 && (
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recommended Resources</p>
                      <ul className="space-y-2">
                        {step.resources.map((res, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <svg className="w-4 h-4 text-green-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm font-medium hover:text-indigo-800 truncate">
                              {res.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Schedule & Rating */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">2</span>
              Weekly Focus
            </h3>
            <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
              {data.weeklySchedule.map((item, index) => (
                <div key={index} className={`p-4 border-b border-slate-100 last:border-0 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <h5 className="font-bold text-slate-700 mb-1">{item.day}</h5>
                  <ul className="list-disc list-inside text-sm text-slate-600 pl-1">
                    {item.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="mb-1">{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-900 text-white rounded-xl p-6 shadow-xl">
            <h4 className="font-bold text-lg mb-2">Privacy & Security</h4>
            <p className="text-indigo-200 text-sm leading-relaxed italic">
              "{data.securityNote}"
            </p>
            <div className="mt-4 pt-4 border-t border-indigo-800 text-xs text-indigo-400">
              FutureForged does not store your personal data. All generation happens on demand.
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 text-center">
            <h4 className="font-bold text-slate-800 mb-2">Rate your Roadmap</h4>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-transform hover:scale-110 focus:outline-none ${rating >= star ? 'text-yellow-400' : 'text-slate-200 hover:text-yellow-200'}`}
                >
                  ★
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-green-600 mt-2 font-medium">Thanks for your feedback!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
