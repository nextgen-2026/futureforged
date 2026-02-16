import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedRoadmap, UserFormData, StudentType } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize the client
// Note: In a real production app, you might proxy this through a backend to hide the key,
// but for this Vercel deployment as requested, we use the env var directly.
const ai = new GoogleGenAI({ apiKey });

export const generateStudentRoadmap = async (
  type: StudentType,
  data: UserFormData
): Promise<GeneratedRoadmap> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure Vercel environment variables.");
  }

  // Upgraded to Pro model for better reasoning on complex roadmap tasks
  const modelId = "gemini-3-pro-preview";
  
  const prompt = `
    You are an expert academic and career counselor AI named 'FutureForged'.
    
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
    
    Output strictly in JSON format matching the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            motivationalQuote: {
              type: Type.STRING,
              description: "A personalized motivational quote including the user's name.",
            },
            steps: {
              type: Type.ARRAY,
              description: "A list of roadmap phases or steps.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  duration: { type: Type.STRING, description: "Estimated time to complete this step" },
                  resources: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        title: { type: Type.STRING, description: "Name of the resource website or video" },
                        url: { type: Type.STRING, description: "Direct URL to the resource" }
                      }
                    }
                  }
                }
              }
            },
            weeklySchedule: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  tasks: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                }
              }
            },
            securityNote: {
              type: Type.STRING,
              description: "A message assuring the user about their data privacy and safe learning habits."
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedRoadmap;
    } else {
      throw new Error("No response generated from AI.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};