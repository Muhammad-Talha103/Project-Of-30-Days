"use client";
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWind, FaCalendar } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  WeatherDataTypes,
  EventTypes,
  WeatherApiResponse,
} from "../Types/Types"; // import Types
import Link from "next/link";

export default function Weather() {
  // Use States
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherDataTypes | null>(null);
  const [error, setError] = useState<string>("");

  // Input field handler
  const inputHandler = (e: EventTypes) => {
    setLocation(e.target.value);
  };

  // Handles keyboard events for the input field.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };

  // Get weather function
  const getWeather = async () => {
    // API key and URL
    const api_key = "e5061ca4fb524bcc8c654443240309";
    const api_url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${location}`;

    if (location) {
      try {
        // Specify the type of the response
        const response = await axios.get<WeatherApiResponse>(api_url);
        if (response.data) {
          // Destructuring the weather data
          const {
            location: { name, country },
            current: { temp_c, condition, humidity, wind_kph },
          } = response.data;

          // Prepend https: to the icon URL if it starts with //
          const conditionIcon = condition.icon.startsWith("//")
            ? `https:${condition.icon}`
            : condition.icon;

          setWeather({
            name,
            country,
            temperature: temp_c,
            conditionText: condition.text,
            conditionIcon, // Now the icon URL is always valid
            humidity,
            windSpeed: wind_kph,
          });
          setError("");
          setLocation("");
        }
      } catch (error) {
        setError("Failed to Fetch Weather Data. Please try again.");
        setWeather(null);
        setLocation("");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-600 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <h1 className="text-teal-700 text-3xl font-semibold mb-6 text-center">
          Weather <span className="text-blue-500">App</span>
        </h1>

        <div className="flex mb-4">
          <input
            onChange={inputHandler}
            onKeyDown={handleKeyDown}
            value={location}
            type="text"
            placeholder="Search Weather..."
            className="flex-1 px-4 py-2 border border-teal-300 rounded-md text-gray-800 placeholder-gray-600"
          />
          <button
            className="ml-3 px-4 py-2 bg-teal-500 text-white rounded-full shadow-md transition-transform transform hover:scale-105"
            onClick={getWeather}
          >
            <FaSearch size={20} />
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-xl text-center mt-4">{error}</p>
        )}

        {weather && (
          <div className="text-gray-700 mt-6 text-center">
            <Image
              src={weather.conditionIcon} // Valid absolute URL with protocol
              alt="Weather Icon"
              width={80}  // Adjust width as per your design
              height={80} // Adjust height as per your design
              className="mx-auto mb-"
            />
            <div className="text-3xl font-semibold mb-2">
              {weather.temperature}°C
            </div>
            <div className="text-xl">
              {weather.name}, {weather.country}
            </div>
            <div className="text-lg italic mt-2 mb-4">
              {weather.conditionText}
            </div>
            <div className="flex justify-center space-x-4">
              <div className="bg-teal-100 p-2 rounded-md flex items-center space-x-2">
                <WiHumidity size={24} />
                <span>{weather.humidity}%</span>
              </div>
              <div className="bg-teal-100 p-2 rounded-md flex items-center space-x-2">
                <FaWind size={24} />
                <span>{weather.windSpeed} km/h</span>
              </div>
            </div>
            <div className="bg-teal-100 p-2 rounded-md flex items-center space-x-2 mt-4 mx-auto">
              <FaCalendar size={24} />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        )}

        <div className="text-center pt-5">
          <Link href="/">
            <button className="bg-teal-500 text-white px-4 py-2 rounded-md transition-transform transform hover:bg-teal-600 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 text-sm sm:text-base md:text-lg lg:text-xl">
              Back To Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
