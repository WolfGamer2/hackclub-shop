'use client';

import React, { createContext, useState, useEffect } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: string;
    thumbnail_url: string;
    variant_id: number | null;
}

interface CartContextType {
    cart: CartItem[] | null;
    addToCart: (item: Omit<CartItem, 'id'>) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[] | null>(null);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];
        setCart(savedCart);
    }, []);

    useEffect(() => {
        if (cart !== null) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (item: Omit<CartItem, 'id'>) => {
        const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
        const newItem: CartItem = { id: uniqueId, ...item };
        setCart((prevCart) => (prevCart ? [...prevCart, newItem] : [newItem]));
    };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart ? prevCart.filter((item) => item.id !== id) : []);
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalPrice = cart ? cart.reduce((total, item) => total + parseFloat(item.price), 0) : 0;

    if (cart === null) {
        // Return null or a loading indicator until cart is loaded
        return null;
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};