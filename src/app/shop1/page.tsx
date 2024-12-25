'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../../types/Product';

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

    // Slice products for different sections
    const hotProducts = products.slice(0, 3);
    const apparelProducts = products.slice(3, 9);
    const accessoriesProducts = products.slice(9, 15);

    return (
        <div className="min-h-screen font-phantom-sans bg-white">
            {/* Header */}
            <header className="relative flex justify-between items-center px-8 py-4 overflow-hidden">
                {/* Background line for the header */}
                <Image
                    src="/images/line.png"
                    alt="Line"
                    width={800}
                    height={400}
                    className="pointer-events-none select-none absolute top-0 right-0 -z-10 w-1/2 h-auto"
                />

                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/images/orpheus_flag.svg"
                            alt="Hack Club Logo"
                            width={150}
                            height={150}
                            className="cursor-pointer"
                        />
                    </Link>
                </div>

                {/* Search & Cart */}
                <div className="flex items-center space-x-4">
                    <Image
                        src="/images/search.png"
                        alt="Search"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                    />
                    <Image
                        src="/images/shopping-cart.png"
                        alt="Shopping Cart"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                        onClick={() => (window.location.href = '/cart')}
                    />
                </div>
            </header>

            {/* Nav buttons */}
            <nav className="flex justify-center space-x-6 my-6">
                <Link href="#apparel">
                    <button
                        className="px-6 py-3 rounded-full text-lg font-semibold text-white
                       bg-gradient-to-r from-[#F1C40F] to-[#33D6A6]
                       shadow-md hover:opacity-90 transition-opacity"
                    >
                        Apparel
                    </button>
                </Link>
                <Link href="#accessories">
                    <button
                        className="px-6 py-3 rounded-full text-lg font-semibold text-white
                       bg-gradient-to-r from-[#5BC0DE] to-[#A633D6]
                       shadow-md hover:opacity-90 transition-opacity"
                    >
                        Accessories
                    </button>
                </Link>
            </nav>

            {/* Loading & Error */}
            {loading && (
                <p className="text-center text-gray-500">Loading products...</p>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Hot in the Shop */}
            <section className="relative container mx-auto p-4" id="hot">
                {/* Background line for section */}
                <Image
                    src="/images/line1.png"
                    alt="Line1"
                    width={800}
                    height={600}
                    className="pointer-events-none select-none absolute -top-20 left-0 -z-10 w-1/2 h-auto"
                />
                <h2 className="text-4xl font-bold mb-6 text-center">
                    <span
                        style={{
                            backgroundImage: 'linear-gradient(to bottom, #FF8C37, #EC3750)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        🔥 Hot
                    </span>{' '}
                    in the Shop
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {hotProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            gradientFrom="#FF8C37"
                            gradientTo="#EC3750"
                        />
                    ))}
                </div>
            </section>

            {/* Apparel */}
            <section className="relative container mx-auto p-4" id="apparel">
                {/* Background line for section */}
                <Image
                    src="/images/line2.png"
                    alt="Line2"
                    width={200}
                    height={200}
                    className="pointer-events-none select-none absolute bottom-0 right-0 -z-10 w-40 h-auto"
                />
                <h2 className="text-4xl font-bold mb-6 text-center">
                    Style it up with{' '}
                    <span
                        style={{
                            backgroundImage: 'linear-gradient(to bottom, #F1C40F, #33D6A6)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        Apparel
                    </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {apparelProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            gradientFrom="#F1C40F"
                            gradientTo="#33D6A6"
                        />
                    ))}
                </div>
            </section>

            {/* Accessories */}
            <section className="relative container mx-auto p-4" id="accessories">
                {/* Background line for section */}
                <Image
                    src="/images/line3.png"
                    alt="Line3"
                    width={200}
                    height={200}
                    className="pointer-events-none select-none absolute bottom-0 left-0 -z-10 w-40 h-auto"
                />
                <h2
                    className="text-4xl font-bold mb-6 text-center"
                    style={{
                        backgroundImage: 'linear-gradient(to bottom, #5BC0DE, #A633D6)',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    Personalize with Accessories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {accessoriesProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            gradientFrom="#5BC0DE"
                            gradientTo="#A633D6"
                        />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-8">
                <p>Made with 💖 by Hack Clubbers.</p>
            </footer>
        </div>
    );
};

export default Shop;
