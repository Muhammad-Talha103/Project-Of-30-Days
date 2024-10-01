"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { GrResume } from "react-icons/gr";
import { BiReset } from "react-icons/bi";

export default function CountDownTimer() {
  const [targetDate, setTargetDate] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
            setTargetDate("");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    }

    return () => clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
  }, [isActive, isPaused]);

  const calculateRemainingTime = () => {
    const currentTime = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const diff = Math.floor((targetTime - currentTime) / 1000);
    setRemainingTime(diff > 0 ? diff : 0);
  };

  const handleStart = () => {
    if (targetDate) {
      calculateRemainingTime();
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    if (isActive) {
      setIsPaused(!isPaused);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    intervalRef.current = null;
    setIsActive(false);
    setIsPaused(false);
    setRemainingTime(0);
    setTargetDate("");
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-6">
      <h1 className="text-4xl font-bold text-white mb-8">
        Countdown <span className="text-yellow-300">Timer</span>
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <input
          type="datetime-local"
          onChange={(e) => setTargetDate(e.target.value)}
          value={targetDate}
          disabled={isActive && isPaused}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-center mb-6 text-4xl font-mono text-gray-800">
          {formatTime(remainingTime)}
        </div>

        <div className="flex flex-col  gap-4 sm:flex-row">
          <Button
            // title="Start"
            icon={<FaArrowAltCircleUp />}
            onclick={handleStart}
            color="bg-green-500 px-6 py-3 flex items-center justify-center hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition"
          />

          <button
            className={`bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition ${isActive ? '' : 'cursor-not-allowed opacity-50'}`}
            onClick={handlePause}
            disabled={!isActive}
          >
            <div className="flex items-center justify-center">
              {isPaused ? (
                <span className="flex items-center px-6 py-3 gap-2">
                  {/* Resume */}
                  <GrResume />
                </span>
              ) : (
                <span className="flex items-center px-6 py-3 gap-2">
                  {/* Pause */}
                  <FaCirclePause />
                </span>
              )}
            </div>
          </button>

          <Button
  // title="Reset"
  icon={<BiReset />}
  onclick={handleReset}
  color="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white flex items-center justify-center px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
/>

        </div>
      </div>

      <Link href="/" className="mt-8 text-white text-lg font-semibold hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
