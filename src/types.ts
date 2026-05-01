export enum CropStatus {
  HEALTHY = 'Healthy',
  WARNING = 'Warning',
  CRITICAL = 'Critical',
}

export interface DiseaseInfo {
  name: string;
  confidence: number;
  description: string;
  symptoms: string[];
  organicTreatment: {
    product: string;
    description: string;
    dosage: string;
    price: number;
    image: string;
  };
  chemicalTreatment: {
    product: string;
    description: string;
    dosage: string;
    price: number;
    image: string;
    inStock: boolean;
  };
}

export interface WeatherData {
  temp: number;
  humidity: number;
  rainfall: number;
}

export interface SoilData {
  npk: [number, number, number];
  ph: number;
  moisture: number;
}

export interface CropScan {
  id: string;
  date: string;
  cropName: string;
  location: string;
  status: CropStatus;
  disease?: DiseaseInfo;
  image: string;
  weather: WeatherData;
  soil: SoilData;
  xaiHighlight?: string; // Base64 or URL showing attention area
}
