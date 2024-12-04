import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
     
      const { amount } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount, // in cents
        currency: 'usd', // Currency
        description: 'Hack Club Shop Payment',
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create payment intent' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
