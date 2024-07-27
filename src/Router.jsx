// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./components/pages/Home/Home";
// import Cart from "./components/pages/Cart/Cart";
// import Result from "./components/pages/Result/Result";
// import Auth from "./components/pages/Auth/Auth";
// import ProductDetail from "./components/pages/ProductDetail/ProductDetail";
// // import {Elements} from '@stripe/react-stripe-js'
// // import { loadStripe } from "@stripe/stripe-js";
// import Payment from "./components/pages/payment/Payment";
// import Orders from "./components/pages/orders/Orders";
// // import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// function Router() {
//   const stripePromise = loadStripe(
//     "pk_test_51McqldCc8l9xEds4LgIJ8HREUw626RN9Q2Z3UYW3OhmbllGSP3sNrxUIMNLJY4nBH4122UeWNudnvoDxYBgvjkHH00hKsB4V39"
//   );
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/auth" element={<Auth />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/category/:categoryName" element={<Result />} />
//         <Route path="/product/:productId" element={<ProductDetail />} />
//         <Route
//           path="/payment"
//           element={
//             <ProtectedRoute
//               msg={"you need to be signed in to pay"}
//               redirect={"/payment"}
//             >
//               <Elements stripe={stripePromise}>
//                 <Payment />
//               </Elements>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <ProtectedRoute
//               msg={"you must logged in to access your orders"}
//               redirect={"/orders"}
//             >
//               <Orders />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default Router;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home'; 
import Signin from './components/pages/Auth/Auth'; 
import Payment from './components/pages/payment/Payment'; 
import Orders from './components/pages/orders/Orders'; 
import Cart from './components/pages/Cart/Cart'; 
import Result from './components/pages/Result/Result'
import ProductDetail from "./components/pages/ProductDetail/ProductDetail";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51PfUQ3Grk86YwXX2UNFoZgBz1GGJRTmyRUEMMXwUavB6CiZPCaZaIjpqpT8Rn1AyRbKdmemJW7733B1xUQdssZcM00cphz0h5A');





function Routering() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Signin />} />
        <Route path="/payment" element={
          <ProtectedRoute msg={"you need to be signed in to pay"}
          redirect={"/payment"}>
          <Elements stripe={stripePromise}>

          <Payment />

          </Elements>
          </ProtectedRoute>
          } />
          
        <Route path="/orders" element={
         <ProtectedRoute msg={"you must log in to see your orders"}
         redirect={"/orders"}> 
          
          
          <Orders />
          </ProtectedRoute>
          
          } />
        <Route path="/category/:categoryName" element={<Result/>} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routering;
