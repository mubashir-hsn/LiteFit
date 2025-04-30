import { createContext, useContext, useState } from 'react';
import { CartContext } from './CartContext.jsx'; 
import toast from 'react-hot-toast';

export const OrderSummaryContext = createContext();

export default function OrderSummaryProvider({ children }) {
  const { cartItems } = useContext(CartContext); 
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  // Calculate subtotal and tax
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.02;

  const validDiscounts = {
    SUMMER10: 0.1, 
    WINTER15: 0.15,
  };

  // Function to apply discount
  const handleDiscount = () => {
    if (!discountCode.trim()) {
      toast.error('Enter a coupon code.');
      return;
    }

    const upperCaseDiscountCode = discountCode.toUpperCase();
    const discountPercentage = validDiscounts[upperCaseDiscountCode];

    if (discountPercentage) {
      toast.success(`Discount applied: ${discountPercentage * 100}%`);
      setDiscountApplied(true)
    //  setDiscountCode('')
    } else {
      toast.error('Invalid discount code.');
      setDiscountCode('')
    }
  };

  // Calculate discount directly in the total calculation
  const upperCaseDiscountCode = discountCode.toUpperCase();
  const discountPercentage = validDiscounts[upperCaseDiscountCode] || 0; // Default to 0 if invalid
  const discountAmount = discountPercentage * subtotal;

  // Calculate final total
  const total = Math.max(0, subtotal + tax - discountAmount); // Ensure total is never negative

  return (
    <OrderSummaryContext.Provider
      value={{
        subtotal,
        tax,
        discountAmount,
        total,
        discountCode,
        setDiscountCode,
        handleDiscount,
        discountApplied,
        setDiscountApplied
      }}
    >
      {children}
    </OrderSummaryContext.Provider>
  );
}

export const useOrderSummary = () => useContext(OrderSummaryContext);