"use client";

import React from "react";
import Link from "next/link";
import Navigation from "./components/Navigation";
import Image from "next/image";

const MainPage = () => {
  return (
    <div className="bg-hackclub-dark min-h-screen flex flex-col">
      {/* Navigation */}
      <Navigation />

      <div className="flex flex-grow items-center justify-center text-white text-center px-6 py-16">
        <div className="max-w-3xl w-full">
          <Image src={"https://hackclub.com/stickers/orpheus_flag.svg"} alt="Hack Club logo" width={150} height={100} className="absolute left-10 z-10" />
          <h1 className="text-6xl font-extrabold mb-8">Welcome to the Hack Club Shop</h1>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Grab exclusive merch designed by and for Hack Clubbers. T-shirts, hoodies, stickers, and more!
          </p>
          <Link
            href="/shop"
            className="bg-hackclub-red py-4 px-10 rounded-lg text-xl hover:bg-red-700 transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </div>

      <footer className="text-center text-white py-6 bg-hackclub-dark">
        © 2024 Hack Club. All rights reserved.
      </footer>
    </div>
  );
};

export default MainPage;
