"use client";

import { useState, useEffect, useRef } from "react";
import { Archivo_Black, Protest_Guerrilla } from "next/font/google";
import { Fireworks } from "fireworks-js";
import Link from "next/link";

// Define the font loader at the module scope
const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mate = Protest_Guerrilla({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function BirthdayWishApp() {
  const [name, setName] = useState(""); // Stores the user's name
  const [birthday, setBirthday] = useState(""); // Stores the user's birthday
  const [message, setMessage] = useState(""); // Stores the message displayed to the user
  const [showFireworks, setShowFireworks] = useState(false); // Toggles fireworks display
  const fireworksRef = useRef(null); // Reference to the fireworks container element

  useEffect(() => {
    if (showFireworks && fireworksRef.current) {
      const fireworks = new Fireworks(fireworksRef.current, {
        rocketsPoint: { min: 50, max: 50 },
        hue: { min: 0, max: 360 },
        delay: { min: 30, max: 60 },
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1,
        particles: 100,
        explosion: 5,
      });

      fireworks.start();
      setTimeout(() => {
        setShowFireworks(false);
      }, 15000);

      return () => fireworks.stop();
    }
  }, [showFireworks]);

  const clearInputs = () => {
    setName("");
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const today = new Date();
    const todayMonthDay = today.toISOString().slice(5, 10);
    const inputDate = new Date(birthday);
    const inputMonthDay = inputDate.toISOString().slice(5, 10);
    const inputYear = today.getFullYear();

    let nextBirthday = new Date(`${inputYear}-${inputMonthDay}`);
    if (nextBirthday < today) {
      nextBirthday = new Date(`${inputYear + 1}-${inputMonthDay}`);
    }

    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (name === "") {
      setMessage("Please enter your name.");
      clearInputs();
    } else if (!isNaN(Number(name))) {
      setMessage("Please enter a valid name that isn't a number.");
      clearInputs();
    } else if (todayMonthDay === inputMonthDay) {
      setMessage(
        `Happy birthday, ${name}! 🎉\nWishing you a day filled with joy, laughter, and all your favorite things!`
      );
      setShowFireworks(true);
    } else if (daysUntilBirthday > 300) {
      setMessage(
        `Hey ${name}, your birthday is ${daysUntilBirthday} days away! 🎉\nIt’s never too early to plan a fantastic celebration!`
      );
      clearInputs();
    } else if (daysUntilBirthday > 200) {
      setMessage(
        `Hey ${name}, your birthday is ${daysUntilBirthday} days away! 🎈\nTime flies, start thinking about your celebration!`
      );
      clearInputs();
    } else if (daysUntilBirthday > 100) {
      setMessage(
        `Hey ${name}, your birthday is ${daysUntilBirthday} days away! 🥳\nGet excited and start the countdown!`
      );
      clearInputs();
    } else if (daysUntilBirthday > 50) {
      setMessage(
        `Hey ${name}, your birthday is ${daysUntilBirthday} days away! 🎊\nWith just over 50 days, it’s time to plan something special!`
      );
      clearInputs();
    } else if (daysUntilBirthday <= 50) {
      setMessage(
        `Hey ${name}, your birthday is just ${daysUntilBirthday} days away! 🎁\nThe countdown is on!`
      );
      clearInputs();
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-fixed bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      {showFireworks && (
        <div
          ref={fireworksRef}
          className="absolute inset-0 flex items-center justify-center z-50"
        ></div>
      )}

      <div className="bg-white border-4 border-blue-300 rounded-xl shadow-2xl p-8 w-full max-w-lg mx-4 sm:mx-6 md:mx-8 lg:mx-12 z-10 animate-fade-in">
        <h1 className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text tracking-tighter">
          {" "}
          <span
            className={`${mate.className} text-6xl text-yellow-500 font-black drop-shadow-lg`}
          >
            BIRTHDAY
          </span>{" "}
          <span className={`${archivo.className} text-slate-900 font-bold`}>
            WISH
          </span>{" "}
          <span className="font-serif text-pink-600">APP</span>
        </h1>

        <form className="flex flex-col items-center">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            placeholder="Your Name"
            className="w-full p-4 mb-4 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-pink-500 bg-white shadow-md hover:shadow-lg transition-all duration-300"
          />
          <input
            onChange={(e) => setBirthday(e.target.value)}
            type="date"
            className="w-full p-4 mb-6 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-pink-500 bg-white shadow-md hover:shadow-lg transition-all duration-300"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg py-3 rounded-xl hover:bg-gradient-to-l shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Submit
          </button>
        </form>

        <p className="text-center text-xl text-gray-600 mt-6 mb-6 font-semibold whitespace-pre-line">
          {message}
        </p>

        <button className=" w-full px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:underline hover:bg-gradient-to-l transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300">
          <Link href="/">Back to Home</Link>
        </button>
      </div>
    </div>
  );
}
