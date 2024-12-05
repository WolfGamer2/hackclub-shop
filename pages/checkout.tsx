import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Retrieve cart items 
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
    setCart(savedCart);
  }, []);

  const handleCheckout = () => {
    setLoading(true);

    // fake payment process
    setTimeout(() => {
      setLoading(false);
      alert('Checkout complete!');
      router.push('/thank-you'); // Redirect to thank-you page
    }, 2000);  // 2 seconds wait
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <div className="mt-4">
        <h2 className="text-xl">Cart Items</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>${item.price ? item.price.toFixed(2) : '0.00'}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-4 font-semibold">
          <span>Total:</span>
          <span>
            ${cart.reduce((total, item) => total + (item.price ? item.price * (item.quantity || 1) : 0), 0).toFixed(2)}
          </span>
        </div>

        <button
          className="bg-blue-600 text-white py-2 px-4 mt-6 rounded"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
