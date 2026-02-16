import React, { useState } from 'react';
import { Logo } from './components/Logo';
import { Landing } from './components/Landing';
import { InputForm } from './components/InputForm';
import { RoadmapDisplay } from './components/RoadmapDisplay';
import { generateStudentRoadmap } from './services/geminiService';
import { AppState, StudentType, UserFormData, GeneratedRoadmap } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [studentType, setStudentType] = useState<StudentType>(null);
  const [formData, setFormData] = useState<UserFormData | null>(null);
  const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStudentSelect = (type: StudentType) => {
    setStudentType(type);
    setAppState('form');
  };

  const handleFormSubmit = async (data: UserFormData) => {
    setFormData(data);
    setAppState('loading');
    setError(null);
    try {
      if (studentType) {
        const result = await generateStudentRoadmap(studentType, data);
        setRoadmap(result);
        setAppState('roadmap');
      }
    } catch (err: any) {
      setError(err.message || "Failed to generate roadmap. Please check API Key configuration.");
      setAppState('form');
    }
  };

  const handleReset = () => {
    setAppState('landing');
    setStudentType(null);
    setFormData(null);
    setRoadmap(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          {appState !== 'landing' && (
             <div className="text-sm text-slate-500 hidden md:block">
                Identify. Plan. Achieve.
             </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}

        {appState === 'landing' && (
          <Landing onSelect={handleStudentSelect} />
        )}

        {appState === 'form' && studentType && (
          <InputForm 
            studentType={studentType} 
            onSubmit={handleFormSubmit}
            onBack={() => setAppState('landing')}
          />
        )}

        {appState === 'loading' && (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 animate-pulse">Forging Your Path...</h2>
            <p className="text-slate-500 mt-2 text-center max-w-md">
              Our AI is analyzing your goals and curating the best resources for your journey.
            </p>
          </div>
        )}

        {appState === 'roadmap' && roadmap && formData && (
          <RoadmapDisplay 
            data={roadmap} 
            userData={formData} 
            onReset={handleReset} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Logo className="scale-75 origin-center grayscale opacity-50 hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} FutureForged. Powered by Google Gemini AI.
          </p>
          <p className="text-xs mt-2 text-slate-600">
            For educational purposes only. Always verify critical academic requirements with your institution.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
