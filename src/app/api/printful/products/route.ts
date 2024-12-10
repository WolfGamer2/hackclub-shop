import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const PRINTFUL_API_URL = process.env.PRINTFUL_API_URL!;
	const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID!;
	const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;

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

		const productsWithPrice = await Promise.all(
			products.map(async (product: any) => {
				const response = await fetch(`${PRINTFUL_API_URL}/store/products/${product.id}`, {
					headers: {
						'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
						'X-PF-Store-Id': PRINTFUL_STORE_ID,
					},
				});

				if (!response.ok) {
					throw new Error(`Failed to fetch product ${product.id}`);
				}

				const productData = await response.json();

				if (productData.result.sync_variants && productData.result.sync_variants.length > 0) {
					const mainVariant = productData.result.sync_variants[0];
					const price = mainVariant.retail_price;

					return {
						id: product.id,
						name: product.name,
						thumbnail_url: product.thumbnail_url,
						price,
						variant_id: mainVariant.id,
					};
				} else {
					return {
						id: product.id,
						name: product.name,
						thumbnail_url: product.thumbnail_url,
						price: '0.00',
						variant_id: null,
					};
				}
			})
		);

		return NextResponse.json({ code: 200, result: productsWithPrice });
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ code: 500, message: error.message }, { status: 500 });
	}
}