import type { NextApiRequest, NextApiResponse } from "next";

const PRINTFUL_API_URL = "https://api.printful.com";
let cachedProducts: any = null;
let lastFetchTime = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const CACHE_DURATION = 60 * 60 * 1000;
	if (cachedProducts && (Date.now() - lastFetchTime) < CACHE_DURATION) {
		return res.status(200).json(cachedProducts);
	}
	try {
		const response = await fetch(`${PRINTFUL_API_URL}/products`, {
			headers: {
				"Authorization": `Bearer ${process.env.PRINTFUL_API_KEY}`,
			},
		});

		if (!response.ok) {
			return res.status(response.status).json({ error: "Failed to fetch products" });
		}

		const data = await response.json();
		cachedProducts = data;
		lastFetchTime = Date.now();
		console.log(data);
		res.status(200).json(data);
	} catch (error) {
		console.error('Error fetching products:', error);
		res.status(500).json({ error: "Internal server error" });
	}
}
