import { GoogleGenerativeAI } from "@google/generative-ai";
import { GeneratedRoadmap, UserFormData, StudentType } from "../types";

// ⚠️ IMPORTANT: If you use Vite, change this to: import.meta.env.VITE_GEMINI_API_KEY
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';

export const generateStudentRoadmap = async (
  type: StudentType,
  data: UserFormData
): Promise<GeneratedRoadmap> => {
  
  if (!apiKey) {
    throw new Error("API Key is missing. Check your .env file.");
  }

  // 👇 THIS WAS MISSING
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash", // 'gemini-pro' is old. '1.5-flash' is faster and cheaper.
    generationConfig: { responseMimeType: "application/json" } // This forces JSON output
  });
  
  const prompt = `You are FutureForged, an academic counselor AI.

  Student: ${data.name}, ${type} student, Year ${data.year}
  Goals: ${data.goals}

  Create a personalized roadmap.
  Output ONLY valid JSON matching this schema:
  {
    "motivationalQuote": "string",
    "steps": [{"title": "string", "description": "string", "duration": "string", "resources": [{"title": "string", "url": "string"}]}],
    "weeklySchedule": [{"day": "string", "tasks": ["string"]}],
    "securityNote": "string"
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // No need for regex replacement if we use responseMimeType: "application/json"
    const roadmap = JSON.parse(text) as GeneratedRoadmap;
    
    if (!roadmap.motivationalQuote || !roadmap.steps) {
      throw new Error("Invalid response format");
    }
    
    return roadmap;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate roadmap.");
  }
};