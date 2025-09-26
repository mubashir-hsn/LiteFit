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


  // Add to cart function
const addToCart = (item) => {
    const selectedSize = item.size;

    setCartItems((prevItems) => {
        const sameProductSameSize = prevItems.find(
            cartItem => cartItem._id === item._id && cartItem.size === selectedSize
        );

        const totalStock = item.stock; // total stock from DB
        const totalInCart = prevItems
            .filter(cartItem => cartItem._id === item._id)
            .reduce((sum, cartItem) => sum + cartItem.quantity, 0);

        // ❌ Check if adding will exceed stock
        if (totalInCart >= totalStock) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Cannot add more than available stock!",
                showConfirmButton: false,
                timer: 1500
            });
            return prevItems;
        }

        // ⚠️ Low stock warning
        const remaining = totalStock - (totalInCart + 1);
        if (remaining > 0 && remaining <= 2) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `Only ${remaining} item${remaining > 1 ? 's' : ''} left in stock!`,
                showConfirmButton: false,
                timer: 1500
            });
        }

        // ✅ If same size exists → increase quantity + success alert
        if (sameProductSameSize) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Quantity updated for size ${selectedSize || "-"}.`,
                showConfirmButton: false,
                timer: 1000,
            });

            return prevItems.map(cartItem => {
                if (cartItem._id === item._id && cartItem.size === selectedSize) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            });
        }

        // ✅ If new size → add new entry + success alert
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Product (Size: ${selectedSize || "-"}) added to cart.`,
            showConfirmButton: false,
            timer: 1000,
        });

        return [
            ...prevItems,
            {
                ...item,
                size: selectedSize,
                quantity: 1,
                stock: totalStock
            }
        ];
    });
};




// Increase quantity for a specific product size

const increaseQuantity = (id, size) => {
    setCartItems((prevItems) => {
        const product = prevItems.find(cartItem => cartItem._id === id);
        const totalStock = product ? product.stock : 0;

        const totalInCart = prevItems
            .filter(cartItem => cartItem._id === id)
            .reduce((sum, cartItem) => sum + cartItem.quantity, 0);

        if (totalInCart >= totalStock) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "No more stock available!",
                showConfirmButton: false,
                timer: 1500
            });
            return prevItems;
        }

        const remaining = totalStock - (totalInCart + 1);
        if (remaining > 0 && remaining <= 2) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `Only ${remaining} item${remaining > 1 ? 's' : ''} left in stock!`,
                showConfirmButton: false,
                timer: 1500
            });
        }

        return prevItems.map(cartItem => {
            if (cartItem._id === id && cartItem.size === size) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
    });
};


// Decrease quantity for a specific product size
const decreaseQuantity = (id, size) => {
    setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
            cartItem._id === id && cartItem.size === size
                ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
                : cartItem
        )
    );
};

// Remove a specific size of a product from the cart
const removeFromCart = (id, size) => {
    setCartItems((prevItems) =>
        prevItems.filter(
            (cartItem) => !(cartItem._id === id && cartItem.size === size)
        )
    );
};


    // Clear cart
    const clearCart = () => {
        setCartItems([]);
        if (setcount) {
            setcount(0);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
