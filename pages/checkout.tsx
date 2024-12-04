// pages/checkout.tsx
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Checkout = () => {
  const [cart, setCart] = useState<any[]>([]); // This will hold the cart items
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch cart from localStorage or a global state (you can replace it with your actual cart state)
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  useEffect(() => {
    // Calculate the total amount
    const totalAmount = cart.reduce((total, item) => total + item.price, 0) * 100; // amount in cents

    // Call your API to create the payment intent
    const createPaymentIntent = async () => {
      const res = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    if (cart.length > 0) {
      createPaymentIntent();
    }
  }, [cart]);

  const handleCheckout = async () => {
    if (!clientSecret) return;

    const stripe = await stripePromise;

    // payment
    const { error, paymentIntent } = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: { /* need to add cards */ },
      },
    });

    if (error) {
      console.error(error);
      alert('Payment failed');
    } else if (paymentIntent?.status === 'succeeded') {
      alert('Payment successful!');
      router.push('/thank-you'); 
    }
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
          disabled={loading || !clientSecret}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
