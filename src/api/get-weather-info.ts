import axios from "axios";

export interface WeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface GetWeatherResponse {
  weather: WeatherItem[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: string;
  };
  sys: {
    country: string;
  };
  name: string;
}
export async function getWeatherInfo(search: string) {
  const response = await axios.get<GetWeatherResponse>(
    `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=000fbc94800396d6dc3679ce120fc32a`
  );

  return response.data;
}
