import {createBrowserRouter} from "react-router-dom";
import App from '../App';
import Home from '../pages/Home/Home.jsx';
import CategoryPage from '../pages/categories/CategoryPage.jsx';
import Search from '../pages/search/Search.jsx';
import SingleProduct from '../pages/shop/productDetails/SingleProduct.jsx';
import ContactPage from '../pages/contact/ContactPage.jsx'
import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';
import About from '../pages/About/About.jsx';
import CartCheckOut from '../pages/shop/cart/CartCheckOut.jsx';
import OtpVerification from '../components/OtpVerification.jsx';
import AuthForm from '../components/AuthForm.jsx';
import ChangePassword from '../components/ChangePassword.jsx';
import DashboardLayout from '../Admin/DashboardLayout/DashboardLayout.jsx';
import Dashboard from '../Admin/DashboardComponents/Pages/Dashboard.jsx';
import AddProduct from '../Admin/DashboardComponents/Pages/AddProduct.jsx';
import ManageProducts from '../Admin/DashboardComponents/Pages/ManageProducts.jsx';
import UpdateProduct from '../Admin/DashboardComponents/Pages/UpdateProduct.jsx';
import AllUsers from '../Admin/DashboardComponents/Pages/AllUsers.jsx';
import AllOrders from '../Admin/DashboardComponents/Pages/AllOrders.jsx';
import AllReviews from '../Admin/DashboardComponents/Pages/AllReviews.jsx';
import ProtectedRoute from './PretectedRoutes.jsx'
import OrderSuccess from '../pages/shop/orderPages/OrderSuccessPage.jsx';
import OrderDetails from '../pages/shop/orderPages/OrderDetails.jsx';
import PaymentSuccess from '../pages/shop/orderPages/PaymentSuccess.jsx';
import OrderFailed from '../pages/shop/orderPages/OrderFailed.jsx';
import BlogPage from '../pages/blogs/BlogPage.jsx';
import TrackOrder from '../Admin/DashboardComponents/Pages/TrackOrder.jsx';
import PaymentHistory from '../Admin/DashboardComponents/Pages/PaymentHistory.jsx';
import Shop from '../pages/shop/Shop.jsx';
import CartModal from '../pages/shop/cart/CartModal.jsx';
import AddCategory from '../Admin/DashboardComponents/Pages/AddCategory.jsx';
import AddBlog from '../Admin/DashboardComponents/Pages/AddBlog.jsx';
import User from "../profile/User.jsx";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {  index: true, element: <Home />},
        { path:"categories/:categoryName", element: <CategoryPage/>},
        {path: "search" , element: <Search/>},
        {path: "shop/:category" , element: <Shop/>},  
        {path: 'shop/c/:id' , element: <SingleProduct/>},
        {path: 'shop/cart' , element: <CartModal/>},
        {
          path: '/shop/cart-checkout' ,
          element:  <ProtectedRoute minCartItems='1'>
                      <CartCheckOut />
                    </ProtectedRoute>
        },

        {path: '/shop/cart-checkout/:orderId' , element:  <OrderSuccess /> },
        {path: '/cart-checkout/cancel' , element:  <OrderFailed /> },
        {path: '/order/order-details/:orderId' , element:  <OrderDetails /> },
        {path: '/contact' , element: <ContactPage/>},
        {path: '/blog' , element: <BlogPage/>},
        {path: '/about' , element: <About/>},
        {path: '/payment-success' , element: <PaymentSuccess/>},
        { path:"/track-order/:orderId" , element: <TrackOrder/>},
      ],
    },
    { path:'/login', element: <Login/>},
    { path:'/register', element: <Register/>},
    { path:'/user/otp/:type', element: <OtpVerification/>},
    { path:'/auth', element: <AuthForm/>},
    { path:'/auth/change-password', element: <ChangePassword/>},
    { path:'/user/:id', element: <User/>},
    { path:"/all-orders" , element: <AllOrders/>},
   
    {
      path:'/admin/dashboard',
      element: (
        <ProtectedRoute requiredRole='admin'>
            <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true , element: <Dashboard/>},
        { path:"add-product" , element: <AddProduct/>},
        { path:"add-category" , element: <AddCategory/>},
        { path:"add-blog" , element: <AddBlog/>},
        { path:"manage-products" , element: <ManageProducts/>},
        { path:"update-product/:id" , element: <UpdateProduct/>},
        { path:"all-orders" , element: <AllOrders/>},
        { path:"all-users" , element: <AllUsers/>},
        { path:"all-reviews" , element: <AllReviews/>},
        { path:"all-payments" , element: <PaymentHistory/>},
      ]
    },
    {
      path:'/user/dashboard',
      element: (
        <ProtectedRoute requiredRole={'user'}>
            <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true , element: <Dashboard/>},
        { path:"orders" , element: <AllOrders/>},
        { path:"reviews" , element: <AllReviews/>},
        { path:"payments" , element: <PaymentHistory/>},
      ]
    }
  ]);

export default router