import React from "react";
import Navigation from '../../components/Navigation';

const MainPage = () => {
  return (
    <div className="bg-hackclub-light min-h-screen flex flex-col">
      <Navigation />

      {/* full screen and centered */}
      <div className="flex flex-grow items-center justify-center bg-hackclub-dark text-white text-center py-16">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Welcome to the Hack Club Shop</h1>
          <p className="text-lg mb-8">
            Grab exclusive merch designed by and for Hack Clubbers. T-shirts, hoodies, stickers, and more!
          </p>
          <button className="bg-hackclub-red py-3 px-8 rounded-lg text-lg hover:bg-red-700 transition">
            Start Shopping
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white py-4 bg-hackclub-dark">
        © 2024 Hack Club. All rights reserved.
      </footer>
    </div>
  );
};

export default MainPage;
