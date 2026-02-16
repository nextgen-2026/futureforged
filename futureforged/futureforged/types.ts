export type StudentType = 'school' | 'college' | null;

export interface UserFormData {
  name: string;
  year: string;
  goals: string;
}

export interface ResourceLink {
  title: string;
  url: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  resources: ResourceLink[];
}

export interface WeeklyScheduleDay {
  day: string;
  tasks: string[];
}

export interface GeneratedRoadmap {
  motivationalQuote: string;
  steps: RoadmapStep[];
  weeklySchedule: WeeklyScheduleDay[];
  securityNote: string;
}

export type AppState = 'landing' | 'form' | 'loading' | 'roadmap';
