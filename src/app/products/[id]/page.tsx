'use client';

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { CartContext } from "../../../context/CartContext";
import Navigation from "../../components/Navigation";

interface Variant {
    id: number;
    external_id: string;
    sync_product_id: number;
    name: string;
    synced: boolean;
    variant_id: number;
    retail_price: string;
    currency: string;
    is_ignored: boolean;
    sku: string;
    product: {
        variant_id: number;
        product_id: number;
        image: string;
        name: string;
    };
    files: Array<{
        type: string;
        id: number;
        url: string;
        options: Array<{
            id: string;
            value: string;
        }>;
        hash: string;
        filename: string;
        mime_type: string;
        size: number;
        width: number;
        height: number;
        dpi: number;
        status: string;
        created: number;
        thumbnail_url: string;
        preview_url: string;
        visible: boolean;
        is_temporary: boolean;
        stitch_count_tier: string;
    }>;
    options: Array<{
        id: string;
        value: string;
    }>;
    main_category_id: number;
    warehouse_product_id: number;
    warehouse_product_variant_id: number;
    size: string;
    color: string;
    availability_status: string;
}

interface ProductDetail {
    id: number;
    external_id: string;
    name: string;
    variants: number;
    synced: number;
    thumbnail_url: string;
    is_ignored: boolean;
}

const ProductPage = () => {
    const params = useParams();
    const productId = params.id;

    const { addToCart } = useContext(CartContext)!;

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
    const [variants, setVariants] = useState<Variant[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/printful/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                console.log(data);
                setProduct(data.result.sync_product);
                setVariants(data.result.sync_variants);

                if (data.result.sync_variants && data.result.sync_variants.length > 0) {
                    setSelectedVariant(data.result.sync_variants[0]);
                }
            } catch (error: any) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        if (product && selectedVariant) {
            const cartItem = {
                name: selectedVariant.name,
                price: selectedVariant.retail_price,
                thumbnail_url: selectedVariant.product.image,
                variant_id: selectedVariant.variant_id,
            };

            addToCart(cartItem);
            alert('Product added to cart!');
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Navigation />
                <div className="container mx-auto p-6">
                    <p className="text-center text-gray-500">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Navigation />
                <div className="container mx-auto p-6">
                    <p className="text-center text-red-500">{error || 'Product not found'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navigation />
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                    <img
                        src={selectedVariant?.product.image || product.thumbnail_url}
                        alt={product.name}
                        className="w-full md:w-1/2 h-auto object-contain mb-6 md:mb-0"
                    />
                    <div className="md:ml-6 w-full md:w-1/2">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-xl text-gray-700 mb-4">
                            Price: ${parseFloat(selectedVariant?.retail_price || '0.00').toFixed(2)}
                        </p>

                        {/* Variant Selection */}
                        {variants.length > 0 && (
                            <div className="mb-4">
                                <label htmlFor="variant" className="block text-lg font-medium mb-2">
                                    Select Variant:
                                </label>
                                <select
                                    id="variant"
                                    value={selectedVariant?.variant_id || ''}
                                    onChange={(e) => {
                                        const variant = variants.find(v => v.variant_id === parseInt(e.target.value));
                                        setSelectedVariant(variant || null);
                                    }}
                                    className="border rounded p-2 w-full"
                                >
                                    {variants.map((variant) => (
                                        <option key={variant.variant_id} value={variant.variant_id}>
                                            {variant.name} - {variant.size} / {variant.color}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;