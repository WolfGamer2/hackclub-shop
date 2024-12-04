// app/page.tsx
import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600">Hack Club Shop</h1>
        <p className="text-xl text-gray-700 mt-4">
          The best place to buy exclusive Hack Club merch!
        </p>
      </header>

      <main className="flex flex-col items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to Our Shop</h2>
          <p className="text-lg text-gray-600 mt-4">
            Explore our range of cool merch, from t-shirts to hoodies. Custom designs for Hack Club members!
          </p>
          <button className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Start Shopping
          </button>
        </div>
      </main>

      <footer className="mt-12 text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Hack Club. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
