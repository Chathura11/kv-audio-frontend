import React from 'react';
import { FaHeadphonesAlt, FaShoppingCart, FaRegStar } from 'react-icons/fa';
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-white text-gray-800">
        <div className="mb-10 md:mb-0 md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Rent <span className="text-[#3674B5]">Professional Musical Gear</span> <br />
            for Any Occasion
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Simplify your events and productions with high-quality musical rentals. Affordable, flexible, and reliable.
          </p>
          <Link to='/item' className="px-6 py-3 bg-[#3674B5] text-white font-semibold rounded-full hover:bg-[#2c5d91] transition">
            Browse Items
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <FaHeadphonesAlt className="text-9xl md:text-[200px] text-[#3674B5]" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#3674B5]">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center border-t-4 border-[#3674B5]">
            <FaRegStar className="text-5xl mx-auto text-[#3674B5] mb-4" />
            <h3 className="text-xl font-bold mb-2">Top Quality</h3>
            <p>Every item is maintained and tested for peak performance before renting out.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center border-t-4 border-[#3674B5]">
            <FaShoppingCart className="text-5xl mx-auto text-[#3674B5] mb-4" />
            <h3 className="text-xl font-bold mb-2">Flexible Plans</h3>
            <p>Rent equipment daily, weekly, or monthly — whatever suits your project timeline.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center border-t-4 border-[#3674B5]">
            <FaHeadphonesAlt className="text-5xl mx-auto text-[#3674B5] mb-4" />
            <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
            <p>From microphones to mixers — we’ve got the gear you need to sound professional.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center">
        <p>&copy; 2025 KV Audio — All rights reserved.</p>
      </footer>

    </div>
  );
}
