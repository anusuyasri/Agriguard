import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, WeatherData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    cropName: { type: Type.STRING },
    status: { type: Type.STRING, enum: ['Healthy', 'Warning', 'Critical'] },
    disease: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        confidence: { type: Type.NUMBER },
        description: { type: Type.STRING },
        symptoms: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        organicTreatment: {
          type: Type.OBJECT,
          properties: {
            product: { type: Type.STRING },
            description: { type: Type.STRING },
            dosage: { type: Type.STRING },
            price: { type: Type.NUMBER },
          },
          required: ['product', 'description', 'dosage', 'price']
        },
        chemicalTreatment: {
          type: Type.OBJECT,
          properties: {
            product: { type: Type.STRING },
            description: { type: Type.STRING },
            dosage: { type: Type.STRING },
            price: { type: Type.NUMBER },
            inStock: { type: Type.BOOLEAN }
          },
          required: ['product', 'description', 'dosage', 'price', 'inStock']
        }
      },
      required: ['name', 'confidence', 'description', 'symptoms', 'organicTreatment', 'chemicalTreatment']
    },
    xaiExplanation: { type: Type.STRING, description: 'Explanation of which visual parts led to this conclusion' }
  },
  required: ['cropName', 'status', 'xaiExplanation']
};

export async function analyzeCrop(
  image64: string,
  weather: WeatherData,
  soil: SoilData
) {
  const prompt = `
    Analyze this crop image for potential diseases. 
    Context:
    - Temperature: ${weather.temp}°C
    - Humidity: ${weather.humidity}%
    - Recent Rainfall: ${weather.rainfall}mm
    - Soil NPK: ${soil.npk.join('-')}
    - Soil pH: ${soil.ph}
    - Soil Moisture: ${soil.moisture}%

    Identify if the plant has a specific disease or deficiency. 
    Differentiate between fungal issues (often humidity driven) and nutrient deficiencies (NPK driven).
    Provide the response in the specified JSON format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: image64,
              mimeType: "image/jpeg",
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: analysisSchema,
    },
  });

  return JSON.parse(response.text || "{}");
}
