// app/Calculator.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState(''); // Manage the display state

  // Function to update the display value
  const handleClick = (value: string) => {
    setDisplay((prev) => prev + value);
  };

  // Function to handle calculation
  const handleEqual = () => {
    try {
      setDisplay(eval(display).toString()); // Evaluate the expression and update display
    } catch {
      setDisplay('Error'); // Show error if evaluation fails
    }
  };

  // Function to clear display
  const handleClear = () => {
    setDisplay('');
  };

  // Function to delete last entry
  const handleDelete = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <form>
          {/* Display */}
          <div className="mb-4">
            <input
              type="text"
              name="display"
              value={display}
              className="w-full text-right text-3xl p-4 border border-gray-300 rounded-lg bg-gray-50"
              disabled
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-4">
            {/* Row 1 */}
            <button
              type="button"
              className="p-4 bg-red-400 text-white text-xl rounded-lg hover:bg-red-500 transition-all"
              onClick={handleClear}
            >
              AC
            </button>
            <button
              type="button"
              className="p-4 bg-yellow-400 text-white text-xl rounded-lg hover:bg-yellow-500 transition-all"
              onClick={handleDelete}
            >
              DE
            </button>
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('.')}
            >
              .
            </button>
            <button
              type="button"
              className="p-4 bg-blue-400 text-white text-xl rounded-lg hover:bg-blue-500 transition-all"
              onClick={() => handleClick('/')}
            >
              /
            </button>

            {/* Row 2 */}
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('7')}
            >
              7
            </button>
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('8')}
            >
              8
            </button>
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('9')}
            >
              9
            </button>
            <button
              type="button"
              className="p-4 bg-blue-400 text-white text-xl rounded-lg hover:bg-blue-500 transition-all"
              onClick={() => handleClick('*')}
            >
              *
            </button>

            {/* Row 3 */}
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('4')}
            >
              4
            </button>
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('5')}
            >
              5
            </button>
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('6')}
            >
              6
            </button>
            <button
              type="button"
              className="p-4 bg-blue-400 text-white text-xl rounded-lg hover:bg-blue-500 transition-all"
              onClick={() => handleClick('-')}
            >
              -
            </button>

            {/* Row 4 */}
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('1')}
            >
              1
            </button>
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('2')}
            >
              2
            </button>
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('3')}
            >
              3
            </button>
            <button
              type="button"
              className="p-4 bg-blue-400 text-white text-xl rounded-lg hover:bg-blue-500 transition-all"
              onClick={() => handleClick('+')}
            >
              +
            </button>

            {/* Row 5 */}
            <button
              type="button"
              className="col-span-2 p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('00')}
            >
              00
            </button>
            <button
              type="button"
              className="p-4 bg-gray-200 text-xl rounded-lg hover:bg-gray-300 transition-all"
              onClick={() => handleClick('0')}
            >
              0
            </button>
            <button
              type="button"
              className="p-4 bg-green-500 text-white text-xl rounded-lg hover:bg-green-600 transition-all"
              onClick={handleEqual}
            >
              =
            </button>
          </div>
      <Link href="/">
      <button className="bg-bluen-500 text-white w-full mt-4 px-1 py-1 rounded-md transition-transform transform hover:bg-blue-600 sm:px-1 sm:py-1 md:px-1 md:py-1 lg:px-2 lg:py-2 text-sm sm:text-base md:text-lg lg:text-xl">
        Go to Homepage
      </button>
      </Link>
        </form>
      </div>
    </div>
    
  );
};

export default Calculator;
