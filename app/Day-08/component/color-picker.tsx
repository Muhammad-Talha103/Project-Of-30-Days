'use client'; // Enables the component to be used as a Client Component in Next.js, required for client-side features like hooks.

import { useState } from 'react';

// Defining the ColorPicker component.
export default function ColorPicker() {
  // Initializing state to hold the selected color value, starting with white (#ffffff).
  const [color, setColor] = useState('#ffffff');

  // Function to handle the color change event from the input.
  // It updates the state with the new color value whenever the user selects a different color.
  const handleChange = (event: any) => {
    setColor(event.target.value);
  };

  // Function to determine the brightness of the selected color.
  // Converts hex color to RGB and calculates luminance to decide if the text should be light or dark.
  const getTextColor = (hexColor: string) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Return white text for dark colors and black text for light colors
    return luminance < 128 ? '#ffffff' : '#000000';
  };

  return (
    // Main container with full height of the screen, a gray background, and centered content.
<div className="h-screen flex items-center justify-center bg-indigo-500 ">
  {/* Inner container with white background, padding, rounded corners, and shadow for a card-like appearance. */}
  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
    {/* Heading of the color picker app. */}
    <h1 className="text-6xl font-bold t mb-6">Color Picker</h1>

    {/* Input element for picking colors, with type set to 'color'. 
        The value is controlled by the state, and onChange triggers the handleChange function. */}
    <input
      type="color"
      value={color}
      onChange={handleChange}
      className="w-full h-12 border-2 border-gray-300 rounded-lg cursor-pointer transition duration-150 ease-in-out hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Display area showing the selected color as background with some padding and rounded corners. */}
    <div
      className="mt-6 p-4 rounded-lg"
      style={{
        backgroundColor: color, // Inline styling to set the background color based on the selected color from state.
        color: getTextColor(color), // Set text color based on background brightness.
      }}
    >
      {/* Displays the current color code in text format inside the color box. */}
      <p className="text-lg font-semibold">{color}</p> {/* Text styling for displaying the color code. */}
    </div>
  </div>
</div>

  );
}