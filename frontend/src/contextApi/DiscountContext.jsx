// DiscountContext.jsx
import React, { createContext, useState, useContext } from 'react';

const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  return (
    <DiscountContext.Provider value={{ discountAmount, setDiscountAmount, discountApplied, setDiscountApplied }}>
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscount = () => useContext(DiscountContext);
