// Define the types for the weather API response
export interface WeatherApiResponse {
    location: {
      name: string;
      country: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
        icon: string;
      };
      humidity: number;
      wind_kph: number;
    };
  }
  
  
  
  // Define the type for the weather data
  export interface WeatherDataTypes {
    name: string;
    country: string;
    temperature: number;
    conditionText: string;
    conditionIcon: string;
    humidity: number;
    windSpeed: number;
  }
  
  // Define the type for event handling
  export interface EventTypes extends React.ChangeEvent<HTMLInputElement> {}
  