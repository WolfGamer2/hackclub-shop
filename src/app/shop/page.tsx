'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
    id: number;
    name: string;
    price: string;
    thumbnail_url: string;
    variant_id: number | null;
}

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/printful/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.result);
            } catch (error: any) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="bg-hackclub-dark min-h-screen">
            <Navigation />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Shop Our Products</h1>

                {loading && <p className="text-center text-gray-500">Loading products...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="border p-4 rounded-2xl shadow-lg bg-white flex flex-col"
                        >
                            <Link href={`/products/${product.id}`}>
                                <Image
                                    src={product.thumbnail_url}
                                    alt={product.name}
                                    width={500}
                                    height={500}
                                    className="w-full h-48 object-contain mb-4"
                                />
                            </Link>
                            <h2 className="text-xl text-black font-semibold mb-2 flex-grow">{product.name}</h2>
                            <p className="text-lg text-gray-700 mb-4">${parseFloat(product.price).toFixed(2)}</p>
                            <Link href={`/products/${product.id}`}>
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                                >
                                    View Product
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;