"use client";
import { useState } from "react";
import Link from "next/link";

export default function NumberGuessingGame() {
  // State variables to manage the game state
  const [targetNumber, setTargetNumber] = useState(
    () => Math.floor(Math.random() * 10) + 1 // Randomly generates a target number between 1 and 10
  );
  const [guess, setGuess] = useState("0"); // Holds the user's current guess
  const [attempts, setAttempts] = useState(0); // Counts the number of attempts
  const [message, setMessage] = useState(""); // Displays messages to the user
  const [isGameOver, setIsGameOver] = useState(false); // Tracks if the game is over
 
  // Function to handle when the user clicks the "Guess" button
  const handleGuess = () => {
    // Check if the guess is valid (not empty and a number)
    if (!guess || isNaN(Number(guess))) {
      setMessage("Please enter a valid number");
      return;
    }

    // Increment the number of attempts
    setAttempts(attempts + 1);

    // Show the guessed number and target number after each guess


    // Check if the guess is correct
    if (Number(guess) === targetNumber) {
      setMessage(
        `Congratulations! You guessed the number in ${attempts + 1} attempts.`
      );
      setIsGameOver(true); // Set the game as over
    }
    // Check if the guess is too low
    else if (targetNumber > Number(guess)) {
      setMessage("Too low! Try a higher number.");
    }
    // Check if the guess is too high
    else {
      setMessage("Too high! Try a lower number.");
    }

    // Check if the user has reached the maximum number of attempts
    if (attempts === 7 && Number(guess) !== targetNumber) {
      setMessage(`Game Over! The correct number was ${targetNumber}.`);
      setIsGameOver(true); // Set the game as over
    }
  };

  // Function to reset the game when the user clicks the "Reset" button
  const resetGame = () => {
    // Reset the game state
    setTargetNumber(Math.floor(Math.random() * 10) + 1);
    setGuess("0");
    setAttempts(0);
    setMessage("");
    setIsGameOver(false); // Re-enable the Guess button for a new game

  };

  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-200 to-indigo-300 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white border-4 border-blue-600 rounded-lg shadow-lg px-8 py-10 text-center w-full max-w-md">
        {/* Game title */}
        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          Number Guessing Game
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Guess the number between{" "}
          <span className="text-yellow-600 font-bold">1</span> and{" "}
          <span className="text-yellow-600 font-bold">10</span>.<br />
          You have <span className="text-yellow-600 font-bold">8</span> chances.
        </p>

        {/* Input field for the user to enter their guess */}
        <div className="flex items-center justify-center mb-4">
          <input
            type="number"
            placeholder="Enter your guess"
            value={guess}
            className="w-full p-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
            onChange={(e) => setGuess(e.target.value)} // Updates the guess state when the user types
            disabled={isGameOver} // Disable input if the game is over
          />
        </div>

        {/* Buttons for making a guess and resetting the game */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-6 py-3 text-white font-bold rounded-lg transition-all duration-300 ${
              isGameOver
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handleGuess}
            disabled={isGameOver} // Disable button if the game is over
          >
            Guess
          </button>
          <button
            className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300"
            onClick={resetGame} // Calls resetGame when clicked
          >
            {attempts === 8 || isGameOver ? "Start New Game" : "Reset"}
          </button>
        </div>

        {/* Displays the number of attempts */}
        <div className="text-lg font-semibold text-blue-900">
          Attempts: {attempts} / 8
        </div>

        {/* Displays the message to the user */}
        <p className="text-xl text-gray-800 mt-4">{message}</p>

        {/* Back to home link */}
        <div className="mt-6">
          <Link
            href="/"
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
