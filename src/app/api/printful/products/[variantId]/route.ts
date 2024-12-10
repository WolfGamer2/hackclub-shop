// pages/api/printful/products/[variantId].ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const PRINTFUL_API_URL = process.env.PRINTFUL_API_URL!;
    const PRINTFUL_STORE_ID = process.env.PRINTFUL_STORE_ID!;
    const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;

    // Get the last part of the URL as the variant ID
    const variantId = req.nextUrl.pathname.split('/').pop();

    try {
        const response = await fetch(`${PRINTFUL_API_URL}/store/products/${variantId}`, {
            headers: {
                'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
                'X-PF-Store-Id': PRINTFUL_STORE_ID,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }

        const data = await response.json();
        return NextResponse.json({ result: data.result });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}