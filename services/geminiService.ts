import { GoogleGenAI, Type } from "@google/genai";
import { Device } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const interpretCommand = async (
  command: string,
  currentDevices: Device[]
): Promise<Partial<Device>[]> => {
  try {
    const model = "gemini-2.5-flash";
    
    // Minimal payload to save tokens
    const deviceState = currentDevices.map(d => ({
      id: d.id,
      name: d.name,
      type: d.type,
      room: d.room,
      isOn: d.isOn,
      value: d.value
    }));

    const systemInstruction = `
      You are an IoT Assistant. 
      You control a smart home. 
      Given the current state of devices and a user command, return a JSON array of devices that need to be updated.
      If a command implies multiple devices (e.g. "Turn off all lights"), return all relevant updates.
      If the command is unclear or impossible, return an empty array.
      Do not explain, just return JSON.
    `;

    const prompt = `
      Current Devices: ${JSON.stringify(deviceState)}
      User Command: "${command}"
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              isOn: { type: Type.BOOLEAN },
              value: { type: Type.NUMBER, nullable: true },
              status: { type: Type.STRING, nullable: true }
            },
            required: ["id"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as Partial<Device>[];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};