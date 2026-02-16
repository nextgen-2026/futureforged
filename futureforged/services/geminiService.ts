import { GoogleGenerativeAI } from "@google/generative-ai";


import { GeneratedRoadmap, UserFormData, StudentType } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
;

export const generateStudentRoadmap = async (
  type: StudentType,
  data: UserFormData
): Promise<GeneratedRoadmap> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure environment variables.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  });
  
  const prompt = `You are an expert academic and career counselor AI named 'FutureForged'.

User Profile:
- Name: ${data.name}
- Type: ${type} Student
- Current Year/Grade: ${data.year}
- Ambitions/Goals: ${data.goals}

Task:
Generate a personalized, detailed roadmap for this student to achieve their goals.

Requirements:
1. Start with a personalized motivational quote using their name.
2. Create a step-by-step roadmap (approx 4-6 distinct phases/steps).
3. For EACH step, provide a list of specific, real-world URL resources (e.g., Coursera, Khan Academy, YouTube channels, official documentation, university pages) that are relevant to the goal.
4. Create a representative weekly schedule to help them manage time.
5. Include a brief security/privacy assurance note at the end addressed to the student.

Output ONLY valid JSON (no markdown, no code blocks) in this exact format:
{
  "motivationalQuote": "string with ${data.name}'s name",
  "steps": [
    {
      "title": "string",
      "description": "string",
      "duration": "string (e.g., '2 weeks', '1 month')",
      "resources": [
        {
          "title": "string",
          "url": "string (must be valid URL)"
        }
      ]
    }
  ],
  "weeklySchedule": [
    {
      "day": "Monday/Tuesday/etc",
      "tasks": ["task1", "task2"]
    }
  ],
  "securityNote": "string about data privacy and safe learning"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n/, '').replace(/\n```$/, '');
    }
    
    const roadmap = JSON.parse(cleanedText) as GeneratedRoadmap;
    
    if (!roadmap.motivationalQuote || !roadmap.steps || !roadmap.weeklySchedule) {
      throw new Error("Invalid response format from AI");
    }
    
    return roadmap;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error.message?.includes('API key')) {
      throw new Error("Invalid API key. Please check your Gemini API key configuration.");
    } else if (error.message?.includes('quota')) {
      throw new Error("API quota exceeded. Please try again later or check your API limits.");
    } else if (error instanceof SyntaxError) {
      throw new Error("Failed to parse AI response. Please try again.");
    }
    
    throw new Error(error.message || "Failed to generate roadmap. Please try again.");
  }
};