'use client'
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS for initialization
import { useEffect } from 'react'; // Import useEffect hook for initialization
import Link from 'next/link';

export default function MainPage() {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="mx-12 mt-8 grid grid-cols-1 gap-8 hover:text-black sm:grid-cols-2 md:grid-cols-3 mb-4">
      {Array.from({ length: 30 }).map((_, index) => (
        <Link href={index < 9 ? `/Day-0${index + 1}` : `/Day-${index + 1}`} key={index}>
          <div
            data-aos="fade-up" // Add the AOS animation effect
            className="p-12 border-3 border-blue-800 border-[5px] m-2 flex items-center justify-center cursor-pointer hover:bg-blue-100"
            
          >
        
            <h1 className="font-bold">{index < 9 ? `Day-0${index + 1}` : `Day-${index + 1}`}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
