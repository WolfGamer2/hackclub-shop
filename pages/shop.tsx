// pages/Shop.tsx
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

interface Product {
  id: number;
  name: string;
  price: number;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/printful/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const fetchedProducts = data.result;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="bg-gray-100">
      <Navigation cartItemCount={cart.length} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Shop Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow-lg bg-white"
              >
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-lg text-gray-700">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  className="bg-blue-600 text-white py-2 px-4 mt-4 rounded"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading products...</p>
          )}
        </div>

        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          <ul className="mt-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <li key={item.id} className="flex justify-between py-2">
                  <span>{item.name}</span>
                  <button
                    className="text-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </ul>
          {cart.length > 0 && (
            <div className="flex justify-between mt-4 font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
