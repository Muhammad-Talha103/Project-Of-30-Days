"use client";
import Link from "next/link";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";

export default function PasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [uppercase, setUppercase] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [specialCharacters, setSpecialCharacters] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const generatePassword = () => {
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersCharacters = "0123456789";
    const symbolsCharacters = "!@#$%^&*()_+";

    let generatedPassword = "";
    let characters = lowerCase;

    if (uppercase) characters += upperCaseCharacters;
    if (numbers) characters += numbersCharacters;
    if (specialCharacters) characters += symbolsCharacters;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(
        () => {
          setMessage("Password copied to clipboard!");
          setTimeout(() => setMessage(""), 2000);
        },
        () => {
          setMessage("Failed to copy password.");
          setTimeout(() => setMessage(""), 2000);
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Password Generator</h1>
        <div className="mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password shows here"
            readOnly
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={copyToClipboard}
            className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
          >
            <FaRegCopy />
          </button>
        </div>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Length: {length}</h2>
          <input
            id="length"
            type="range"
            min="6"
            max="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="mr-2"
            />
            <span>Include Uppercase Letters</span>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
              className="mr-2"
            />
            <span>Include Numbers</span>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={specialCharacters}
              onChange={(e) => setSpecialCharacters(e.target.checked)}
              className="mr-2"
            />
            <span>Include Symbols</span>
          </div>
        </div>
        <div className="mb-4">
          <button
            onClick={generatePassword}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Generate Password
          </button>
        </div>
        <div className="text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
