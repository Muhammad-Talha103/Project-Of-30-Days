"use client";
import Link from "next/link";
import { useState } from "react";

export default function BMICalculator() {
  const [weight, setWeight] = useState(""); // State for weight input
  const [height, setHeight] = useState(""); // State for height input
  const [bmi, setBmi] = useState<number | null>(null); // State to store the calculated BMI
  const [category, setCategory] = useState(""); // State to store the BMI category

  // Function to calculate BMI
  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100; // Convert height to meters
    const weightInKg = parseFloat(weight); // Convert weight to a number

    // Calculate BMI
    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi); // Update BMI state
    determineBMICategory(calculatedBmi); // Update BMI category
  };

  // Function to determine BMI category based on the calculated BMI
  const determineBMICategory = (bmi: number) => {
    if (bmi < 18.5) setCategory("Underweight");
    else if (bmi >= 18.5 && bmi < 24.9) setCategory("Normal weight");
    else if (bmi >= 25 && bmi < 29.9) setCategory("Overweight");
    else setCategory("Obesity");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full transition-transform transform hover:scale-105 duration-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">BMI Calculator</h1>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 shadow-sm hover:shadow-md"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 shadow-sm hover:shadow-md"
          />
          <button
            onClick={calculateBMI}
            className="w-full bg-purple-600 text-white p-4 rounded transition duration-200 hover:bg-purple-700 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Calculate BMI
          </button>
          {bmi && (
            <div className="mt-4 text-center">
              <p className="text-xl font-semibold text-gray-800">Your BMI: {bmi.toFixed(2)}</p>
              <p className="text-lg text-gray-600">{category}</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          <Link href="/">
            <div className="text-purple-600 underline hover:text-purple-800 transition duration-200">
              Back to Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
