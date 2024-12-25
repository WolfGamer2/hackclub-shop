import { NextResponse } from 'next/server';

export async function GET() {
	const PRINTFUL_API_URL = process.env.PRINTFUL_API_URL;
	const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID;
	const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

	if (!PRINTFUL_API_URL || !PRINTFUL_STORE_ID || !PRINTFUL_API_KEY) {
		return NextResponse.json({ code: 500, message: 'Environment variables are not set' }, { status: 500 });
	}

	try {
		const response = await fetch(`${PRINTFUL_API_URL}/store/products`, {
			headers: {
				'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
				'X-PF-Store-Id': PRINTFUL_STORE_ID,
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch products from Printful');
		}

		const data = await response.json();
		const products = data.result;

		// Fetch details for all products concurrently
		const productsWithDetails = await Promise.all(
			products.map(async (product: any) => {
				const detailResponse = await fetch(`${PRINTFUL_API_URL}/store/products/${product.id}`, {
					headers: {
						'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
						'X-PF-Store-Id': PRINTFUL_STORE_ID,
					},
				});

				if (!detailResponse.ok) {
					console.error(`Failed to fetch details for product ${product.id}`);
					return product; // Return basic product info if details fetch fails
				}

				const detailData = await detailResponse.json();

				return {
					...product,
					sync_product: detailData.result.sync_product,
					sync_variants: detailData.result.sync_variants,
				};
			})
		);

		return NextResponse.json({ code: 200, result: productsWithDetails });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ code: 500, message: error.message }, { status: 500 });
	}
}