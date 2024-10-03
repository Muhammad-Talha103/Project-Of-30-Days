"use client";
import { useState } from "react";

export default function TipCalculator() {
  // State management for bill, tip percentage, total tip, and total amount
  const [bill, setBill] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [totalTip, setTotalTip] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Handle input change for tip percentage
  const handleTipPercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTipPercentage(parseFloat(e.target.value));
  };

  // Reset all fields to initial state
  const resetHandler = () => {
    setBill(0);
    setTipPercentage(0);
    setTotalTip(0);
    setTotalAmount(0);
  };

  // Handle input change for bill amount
  const handleBillAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBill(parseFloat(e.target.value));
  };


  // Calculate the tip and total amount
  const calculateTip = () => {
    const calculatedTip = (bill * tipPercentage) / 100;
    setTotalTip(calculatedTip);
    setTotalAmount(bill + calculatedTip);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
      {/* App Title */}
      <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-600 shadow-md">
        Tip Calculator
      </h1>

      {/* Bill Amount Input */}
      <div className="mb-4">
        <input
          onChange={handleBillAmount}
          value={bill}
          type="number"
          placeholder="Enter bill amount"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
        />
      </div>

      {/* Tip Percentage Input */}
      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter tip percentage"
          onChange={handleTipPercentage}
          value={tipPercentage}
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 shadow-sm hover:shadow-md"
        />
      </div>

      {/* Buttons for Calculate and Reset */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <button
          onClick={calculateTip}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Calculate Tip
        </button>
        <button
          onClick={resetHandler}
          className="bg-gray-300 text-gray-800 p-3 rounded-lg hover:bg-gray-400 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Reset
        </button>
      </div>

      {/* Displaying Results */}
      <div className="mb-4">
        <p className="text-lg font-semibold text-blue-700">Bill Amount: ${bill.toFixed(2)}</p>
        <p className="text-lg font-semibold text-blue-700">Tip Amount: ${totalTip.toFixed(2)}</p>
      </div>

      {/* Total Amount */}
      <hr className="my-4" />
      <div>
        <h1 className="text-2xl font-bold text-blue-600 text-center">
          Total Amount: ${totalAmount.toFixed(2)}
        </h1>
      </div>
    </div>
  </div>
  );
}