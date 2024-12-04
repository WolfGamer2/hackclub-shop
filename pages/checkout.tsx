import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Checkout = () => {
  const [cart, setCart] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // cart items from local storage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  const handleCheckout = () => {
    setLoading(true);
    
    // fake payment
    setTimeout(() => {
      setLoading(false);
      alert('Checkout complete!');
      router.push('/thank-you'); // tahnk you pge
    }, 2000); // 2 seconds wait
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <div className="mt-4">
        <h2 className="text-xl">Cart Items</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-4 font-semibold">
          <span>Total:</span>
          <span>${cart.reduce((total, item) => total + item.price, 0)}</span>
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
