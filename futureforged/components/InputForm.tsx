import React, { useState } from 'react';
import { UserFormData, StudentType } from '../types';

interface InputFormProps {
  studentType: StudentType;
  onSubmit: (data: UserFormData) => void;
  onBack: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({ studentType, onSubmit, onBack }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [goals, setGoals] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && year && goals) {
      onSubmit({ name, year, goals });
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-6 text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors"
      >
        &larr; Back to Selection
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Tell us about yourself
          </h2>
          <p className="text-slate-500 mt-2">
            We'll customize the roadmap based on your current standing and future ambitions as a <span className="font-semibold text-indigo-600">{studentType} student</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. Alex Johnson"
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-slate-700 mb-1">
              {studentType === 'school' ? 'Current Grade/Class' : 'Year of Study / Major'}
            </label>
            <input
              type="text"
              id="year"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder={studentType === 'school' ? "e.g. 10th Grade, High School Senior" : "e.g. Sophomore Computer Science, Final Year BBA"}
            />
          </div>

          <div>
            <label htmlFor="goals" className="block text-sm font-medium text-slate-700 mb-1">Your Main Goals / Ambitions</label>
            <textarea
              id="goals"
              required
              rows={4}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
              placeholder="e.g. I want to become a full-stack developer at a top tech company, or I want to get into a top Medical College."
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            Generate My Roadmap
          </button>
        </form>
      </div>
    </div>
  );
};
