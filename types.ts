
export interface ForecastDay {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  isRainy: boolean;
}

export interface WeatherInfo {
  temp: number;
  condition: string;
  isRainy: boolean;
  isPerfectTime: boolean;
  statusText: 'OPTIMAL' | 'SUB-OPTIMAL' | 'CRITICAL';
  forecast: ForecastDay[];
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}
