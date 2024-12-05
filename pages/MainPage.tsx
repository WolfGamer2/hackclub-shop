import React from "react";
import Navigation from "../components/Navigation";

const MainPage = () => {
  return (
    <div className="bg-hackclub-light min-h-screen flex flex-col">
      <Navigation />
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

      {/* Featured Products Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-hackclub-dark mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example Product Cards */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-hackclub-dark mb-2">Hack Club T-Shirt</h3>
              <p className="text-gray-700">$25.00</p>
              <button className="bg-hackclub-red text-white py-2 px-4 rounded mt-4">
                View Product
              </button>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-hackclub-dark mb-2">Hack Club Hoodie</h3>
              <p className="text-gray-700">$45.00</p>
              <button className="bg-hackclub-red text-white py-2 px-4 rounded mt-4">
                View Product
              </button>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-hackclub-dark mb-2">Sticker Pack</h3>
              <p className="text-gray-700">$10.00</p>
              <button className="bg-hackclub-red text-white py-2 px-4 rounded mt-4">
                View Product
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center text-white py-4 bg-hackclub-dark">
        © 2024 Hack Club. All rights reserved.
      </footer>
    </div>
  );
};

export default MainPage;
