import type { NextApiRequest, NextApiResponse } from "next";

const PRINTFUL_API_URL = "https://api.printful.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${PRINTFUL_API_URL}/products`, {
    headers: {
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PRINTFUL_API_KEY}`,
    },
  });

  if (!response.ok) {
    return res.status(500).json({ error: "Failed to fetch products" });
  }

  const data = await response.json();
  res.status(200).json(data);
}
