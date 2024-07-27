// import React from "react"
// import { useContext, useState } from "react";
// import classes from "./Payment.module.css";
// import { DataContext } from "../../DataProvider/DataProvider";
// import Layout from "../../Layout/Layout";
// import ProductCard from "../../Product/ProductCard";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { ClipLoader } from "react-spinners";
// import { useNavigate } from "react-router-dom";
// import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";
// // import { axiosInstance } from "../../utils/axios";
// import { db } from "../../../Utility/firebase";
// function Payment() {
//   const [{ user, basket }, dispatch] = useContext(DataContext);

//   const totalItem = basket?.reduce((accumulator, item) => {
//     return item.quantity + accumulator;
//   }, 0);

//   const totalPrice = basket.reduce((amount, item) => {
//     return item.price * item.quantity + amount;
//   }, 0);

//   const [cardError, setCardError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     // console.log(e);
//     e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     try {
//       setProcessing(true);
//       // 1. backend || functions ---> contact to the client secret
//       const response = await axiosInstance({
//         method: "POST",
//         url: `/payment/create?total=${totalPrice * 100}`,
//       });

//       console.log(response.data);
//       const clientSecret = response.data.clientSecret;

//       // 2. client side (react side confirmation)
//       const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       console.log(paymentIntent);

//       // 3. after the confirmation --> order firestore database save, clear basket
//       await db
//         .collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .doc(paymentIntent.id)
//         .set({
//           basket: basket,
//           amount: paymentIntent.amount,
//           created: paymentIntent.created,
//         });
//       // empty the basket
//          dispatch({ type: "EMPTY_BASKET" });

//       setProcessing(false);
//       navigate("/orders", { state: { msg: "you have placed new Order" } });
//     } catch (error) {
//       console.log(error);
//       setProcessing(false);
//     }
//   };

//   return (
//     <Layout>
//       {/* header */}
//       <div className={classes.payment__header}>
//         Checkout ({totalItem}) items
//       </div>
//       {/* payment method */}
//       <section className={classes.payment}>
//         {/* address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>123 React Lane</div>
//             <div>Chicago, IL</div>
//           </div>
//         </div>
//         <hr />

//         {/* product */}
//         <div className={classes.flex}>
//           <h3>Review items and delivery</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard key={item.id} product={item} flag cart />
//             ))}
//           </div>
//         </div>
//         <hr />

//         {/* card form */}
//         <div className={classes.flex}>
//           <h3>Payment methods</h3>
//           <div className={classes.payment__card__container}>
//             <div className={classes.payment__details}>
//               <form onSubmit={handlePayment}>
//                 {/* error */}
//                 {cardError && (
//                   <small style={{ color: "red" }}>{cardError}</small>
//                 )}
//                 {/* card element */}
//                 <CardElement onChange={handleChange} />

//                 {/* price */}
//                 <div className={classes.payment__price}>
//                   <div>
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       <p>Total Order |</p>{" "}
//                       <CurrencyFormatter amount={totalPrice} />
//                     </span>
//                   </div>
//                   <button type="submit">
//                     {processing ? (
//                       <div className={classes.loading}>
//                         <ClipLoader color="gray" size={12} />
//                         <p>Please Wait ...</p>
//                       </div>
//                     ) : (
//                       " Pay Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }


// export default Payment

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { ClipLoader } from "react-spinners";
// import classes from "./Payment.module.css";
// import { DataContext } from "../../DataProvider/DataProvider";
// import Layout from "../../Layout/Layout";
// import ProductCard from "../../Product/ProductCard";
// import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";
// import axiosInstance from "../../utils/axios"; // Ensure this import path is correct
// import { db } from "../../../Utility/firebase";
// import { doc, setDoc } from 'firebase/firestore';

// function Payment() {
//   const [{ user, basket }, dispatch] = useContext(DataContext);

//   // Calculate total items and total price
//   const totalItem = basket?.reduce((accumulator, item) => {
//     return (item.amount || 0) + accumulator;
//   }, 0);

//   const totalPrice = basket.reduce((amount, item) => {
//     return (item.price * (item.amount || 0)) + amount;
//   }, 0);

//   const [cardError, setCardError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCardError(e?.error?.message || "");
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       setProcessing(true);

//       // Backend request to create a payment intent
//       const response = await axiosInstance.post("/payment/create", null, {
//         params: { total: totalPrice * 100 },
//       });

//       const clientSecret = response.data.clientSecret;

//       // Client-side confirmation
//       const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         setCardError(error.message);
//         setProcessing(false);
//         return;
//       }

//       // Save the order in Firestore and clear the basket
//       await db.collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .doc(paymentIntent.id)
//         .set({
//           basket: basket,
//           amount: paymentIntent.amount,
//           created: paymentIntent.created,
//         });

//       dispatch({ type: "EMPTY_BASKET" });

//       setProcessing(false);
//       navigate("/orders", { state: { msg: "You have placed a new order" } });
//     } catch (error) {
//       console.error(error);
//       setCardError("An error occurred during the payment process. Please try again.");
//       setProcessing(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className={classes.payment__header}>
//         Checkout ({totalItem}) items
//       </div>
//       <section className={classes.payment}>
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>123 React Lane</div>
//             <div>Chicago, IL</div>
//           </div>
//         </div>
//         <hr />
//         <div className={classes.flex}>
//           <h3>Review items and delivery</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard key={item.id} product={item} flag cart />
//             ))}
//           </div>
//         </div>
//         <hr />
//         <div className={classes.flex}>
//           <h3>Payment methods</h3>
//           <div className={classes.payment__card__container}>
//             <div className={classes.payment__details}>
//               <form onSubmit={handlePayment}>
//                 {cardError && (
//                   <small style={{ color: "red" }}>{cardError}</small>
//                 )}
//                 <CardElement onChange={handleChange} />
//                 <div className={classes.payment__price}>
//                   <div>
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       <p>Total Order |</p>{" "}
//                       <CurrencyFormatter amount={totalPrice} />
//                     </span>
//                   </div>
//                   <button type="submit" disabled={processing}>
//                     {processing ? (
//                       <div className={classes.loading}>
//                         <ClipLoader color="gray" size={12} />
//                         <p>Please Wait ...</p>
//                       </div>
//                     ) : (
//                       "Pay Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Payment;





//  this was the last 

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { ClipLoader } from "react-spinners";
// import classes from "./Payment.module.css";
// import { DataContext } from "../../DataProvider/DataProvider";
// import Layout from "../../Layout/Layout";
// import ProductCard from "../../Product/ProductCard";
// import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";
// import { axiosInstance } from "../../../Api/axios"; // Ensure this import path is correct
// import { db } from "../../../Utility/firebase";
// import {Type} from '../../../Utility/action.type'


// function Payment() {
//   const [{ user, basket }, dispatch] = useContext(DataContext);

//   // Calculate total items and total price
//   const totalItem = basket?.reduce((accumulator, item) => {
//     return (item.amount || 0) + accumulator;
//   }, 0);

//   const totalPrice = basket.reduce((amount, item) => {
//     return (item.price * (item.amount || 0)) + amount;
//   }, 0);

//   const [cardError, setCardError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     // Update card error state based on CardElement changes
//     setCardError(e?.error?.message || "");
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       setProcessing(true);

//       // Backend request to create a payment intent
//       // const response = await axiosInstance.post("/payment/create", null, {
//       //   params: { total: totalPrice * 100 },
//       // });
// const response = await axiosInstance ({
//         method: "post",
//         url: '/payment/create?total=$(total*100)',
//       });


//       const clientSecret = response.data?.clientSecret;

//       // Client-side confirmation
//       const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });
// console.log()
//       if (error) {
//         // Handle errors from Stripe
//         setCardError(error.message);
//         setProcessing(false);
//         return;
//       }

//       // Save the order in Firestore and clear the basket
//       await db.collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .doc(paymentIntent.id)
//         .set({
//           basket: basket,
//           amount: paymentIntent.amount,
//           created: paymentIntent.created,
//         });

//       // Dispatch action to empty the basket
//       dispatch({ type: "EMPTY_BASKET" });

//       setProcessing(false);
//       navigate("/orders", { state: { msg: "You have placed a new order" } });
//     } catch (error) {
//       // Handle errors during the payment process
//       console.error(error);
//       setCardError("An error occurred during the payment process. Please try again.");
//       setProcessing(false);
//     }
//   };

//   return (
//     <Layout>
//       {/* header */}
//       <div className={classes.payment__header}>
//         Checkout ({totalItem}) items
//       </div>
//       {/* payment method */}
//       <section className={classes.payment}>
//         {/* address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email}</div>
//             <div>123 React Lane</div>
//             <div>Chicago, IL</div>
//           </div>
//         </div>
//         <hr />

//         {/* product */}
//         <div className={classes.flex}>
//           <h3>Review items and delivery</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard key={item.id} product={item} flex={true} flag cart />
//             ))}
//           </div>
//         </div>
//         <hr />

//         {/* card form */}
//         <div className={classes.flex}>
//           <h3>Payment methods</h3>
//           <div className={classes.payment__card__container}>
//             <div className={classes.payment__details}>
//               <form onSubmit={handlePayment}>
//                 {/* error */}
//                 {cardError && (
//                   <small style={{ color: "red" }}>{cardError}</small>
//                 )}
//                 {/* card element */}
//                 <CardElement onChange={handleChange} />

//                 {/* price */}
//                 <div className={classes.payment__price}>
//                   <div>
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       <p>Total Order |</p>{" "}
//                       <CurrencyFormatter amount={totalPrice} />
//                     </span>
//                   </div>
//                   <button type="submit" disabled={processing}>
//                     {processing ? (
//                       <div className={classes.loading}>
//                         <ClipLoader color="gray" size={12} />
//                         <p>Please Wait ...</p>
//                       </div>
//                     ) : (
//                       "Pay Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Payment;







// from neba



import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";
import classes from "./Payment.module.css";
import { DataContext } from "../../DataProvider/DataProvider";
import Layout from "../../Layout/Layout";
import ProductCard from "../../Product/ProductCard";
import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";
import { axiosInstance } from "../../../Api/axios"; // Ensure this import path is correct
import { db } from "../../../Utility/firebase";
import { addDoc, collection } from 'firebase/firestore';
// import {Type} from '../../../Utility/action.type'


function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // Calculate total items and total price
  const totalItem = basket?.reduce((accumulator, item) => {
    return (item.amount || 0) + accumulator;
  }, 0);

  const totalPrice = basket.reduce((amount, item) => {
    return (item.price * (item.amount || 0)) + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   // Update card error state based on CardElement changes
  //   setCardError(e?.error?.message || "");
  // };

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("")
  }



  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      setProcessing(true)
      
      const response = await axiosInstance({
        method: "POST",
        url: `http://localhost:5000/payment/create?total=${totalPrice * 100}`
      });
      const clientSecret = response.data?.clientSecret;
      const confirmation = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)
          },
        }
      );
      if (confirmation.paymentIntent) {
        await addDoc(collection(db, 'users', user.uid, 'orders'), {
          basket: basket,
          amount: confirmation.paymentIntent.amount,
          created: confirmation.paymentIntent.created,
        });
      }
   

       // Save the order in Firestore and clear the basket
      // await db.collection("users")
      //   .doc(user.uid)
      //   .collection("orders")
      //   .doc(paymentIntent.id)
      //   .set({
      //     basket: basket,
      //     amount: paymentIntent.amount,
      //     created: paymentIntent.created,
      //   });



      setProcessing(false)
      navigate("/orders", {state: {msg:"you have placed new Order"}})
    } catch (error) {
      console.log(error);
      setProcessing(false)
    }
  };

  return (
    <Layout>
      {/* header */}
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} flag cart />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>{" "}
                      <CurrencyFormatter amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
