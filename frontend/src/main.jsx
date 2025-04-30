import './index.css'
import router from './routers/router.jsx'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { CartProvider } from './contextApi/CartContext.jsx'
import { CounterProvider } from './contextApi/CounterContext.jsx'
import { PrimeReactProvider } from 'primereact/api';
import { DiscountProvider } from './contextApi/DiscountContext.jsx'
import OrderSummaryProvider from './contextApi/OrderSummaryContext.jsx'
import AuthProvider from './contextApi/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
     <PrimeReactProvider>
          <AuthProvider>
               <CounterProvider>
                    <CartProvider>
                         <DiscountProvider>
                              <OrderSummaryProvider>
                                   <RouterProvider router={router} />
                                   <Toaster />
                              </OrderSummaryProvider>
                         </DiscountProvider>
                    </CartProvider>
               </CounterProvider>
          </AuthProvider>
     </PrimeReactProvider>
)
