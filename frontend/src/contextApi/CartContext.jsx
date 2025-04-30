import { createContext, useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { CounterContext } from "./CounterContext.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { setcount } = useContext(CounterContext) || {};

    // Load cart from sessionStorage when component mounts
    useEffect(() => {
        const storedCart = sessionStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // Save cart to sessionStorage whenever cartItems change
    useEffect(() => {
        sessionStorage.setItem("cart", JSON.stringify(cartItems));
        if (setcount) {
            setcount(cartItems.length); // Update count based on unique items
        }
    }, [cartItems, setcount]);

    // Function to handle size selection
    const handleProductSize = (item) => {
        return item.size && Array.isArray(item.size) && item.size.length > 0 ? item.size : ["xs"];
    };

    // Add to cart function
    const addToCart = (item) => {
        const selectedSize = handleProductSize(item);
        let isDuplicate = false; // Flag to track duplicate size

        setCartItems((prevItems) => {
            return prevItems.map((cartItem) => {
                if (cartItem._id === item._id) {
                    // Check if any selected size is already in the cart for this product
                    if (cartItem.size.some(size => selectedSize.includes(size))) {
                        isDuplicate = true; // Set flag to true if duplicate size found
                        return cartItem; // Return as is (no modification)
                    }

                    // Append new size if it's not already in the cart
                    return {
                        ...cartItem,
                        size: [...cartItem.size, ...selectedSize]
                    };
                }
                return cartItem;
            }).concat(
                // If product isn't in cart, add it as a new entry
                prevItems.some(cartItem => cartItem._id === item._id) ? [] : [{ ...item, size: selectedSize, quantity: 1 ,stock: item.stock }]
            );
        });

        if (isDuplicate) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Product with this size is already in the cart.",
                showConfirmButton: false,
                timer: 1000
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product added to cart.",
                showConfirmButton: false,
                timer: 1000
            });
        }
    };

    // Increase quantity of an item but also check if quantity increase from stop it show toast message

    const increaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((cartItem) => {
                if (cartItem._id === id) {
                    if (cartItem.quantity < cartItem.stock) {
                        const newQuantity = cartItem.quantity + 1;
                        const remaining = cartItem.stock - newQuantity;
    
                        if (remaining > 0 && remaining <= 2) {
                            Swal.fire({
                                position: "top-end",
                                icon: "warning",
                                title: `Only ${remaining} item${remaining > 1 ? 's' : ''} left in stock!`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
    
                        return { ...cartItem, quantity: newQuantity };
                    } else {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "No more stock available!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        return cartItem;
                    }
                }
                return cartItem;
            })
        );
    };
    

    // Decrease quantity of an item
    const decreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((cartItem) =>
                cartItem._id === id
                    ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) } // Ensure quantity doesn't go below 1
                    : cartItem
            )
        );
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem._id !== id));
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
        if (setcount) {
            setcount(0);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, handleProductSize, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
