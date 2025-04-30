import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../contextApi/AuthProvider.jsx';
import { CartContext } from '../contextApi/CartContext.jsx';

function ProtectedRoute({ children, requiredRole, minCartItems }) {
  const { authUser } = useAuth();
  const { cartItems } = useContext(CartContext);

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  // If minCartItems is defined, check cart length
  if (minCartItems && cartItems.length < minCartItems) {
    return <Navigate to="/" />;
  }

  // Ensure authUser has a role and compare with requiredRole
  if (requiredRole && authUser?.user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
