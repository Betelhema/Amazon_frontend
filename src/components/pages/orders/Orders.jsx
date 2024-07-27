// import React from "react";
// import { useContext, useEffect, useState } from "react";
// import classes from "./Orders.module.css"
// import { db } from "../../../Utility/firebase";
// import { DataContext } from "../../DataProvider/DataProvider";
// import ProductCard from "../../Product/ProductCard";
// import Layout from "../../Layout/Layout";

// function Orders() {
//   const [{ user }, dispatch] = useContext(DataContext);
//   const [orders, setOrders] = useState([]);
//   useEffect(()=>{
//   if (user) {
//       db.collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         .onSnapshot((snapshot) => {
//           console.log(snapshot);
//           setOrders(
//             snapshot.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }))
//           );
//         });
//     } else {
//       setOrders([]);
//     }
//   }, [user]);
// console.log(orders)
//   return (
//     <Layout>
//       <section className={classes.container}>
//         <div className={classes.orders__container}>
//           <h2>Your Orders</h2>
//           {orders?.length == 0 && (
//             <div style={{ padding: "20px" }}>
//               you don&apos;t have orders yet.
//             </div>
//           )}
//           {/* ordered items */}
//           <div>
//             {orders?.map((eachOrder, i) => {
//               return (
//                 <div key={i}>
//                   <hr />
//                   <p>Order ID: {eachOrder?.id}</p>
//                   {eachOrder?.data?.basket?.map((order) => (
//                     <ProductCard flag cart product={order} key={order.id} />
//                   ))}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Orders

// // import React from 'react'
// // import Layout from '../../Layout/Layout'

// // function Orders() {
// //   return (
// //     <Layout>
// //     <div>Orders</div>
// //     </Layout>
// //   )
// // }

// // export default Orders

// this was the last code 

// import React, { useContext, useEffect, useState } from "react";
// import classes from "./Orders.module.css";
// import { db } from "../../../Utility/firebase";
// import { DataContext } from "../../DataProvider/DataProvider";
// import ProductCard from "../../Product/ProductCard";
// import Layout from "../../Layout/Layout";
// import { collection, orderBy, onSnapshot, query } from 'firebase/firestore';

// function Orders() {
//   const [{ user }] = useContext(DataContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (user) {
//       // Firestore query to get the orders collection for the logged-in user
//       const ordersCollection = collection(db, 'users', user.uid, 'orders');
//       const ordersQuery = query(ordersCollection, orderBy('created', 'desc'));

//       // Real-time listener for orders
//       const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
//         console.log("Snapshot received:", snapshot);
//         if (!snapshot.empty) {
//           setOrders(
//             snapshot.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }))
//           );
//         } else {
//           console.log("No orders found.");
//           setOrders([]);
//         }
//       }, (error) => {
//         console.error("Error fetching orders:", error);
//       });

//       // Cleanup subscription on unmount
//       return () => unsubscribe();
//     } else {
//       setOrders([]);
//     }
//   }, [user]);

//   console.log("Orders:", orders);

//   return (
//     <Layout>
//       <section className={classes.container}>
//         <div className={classes.orders__container}>
//           <h2>Your Orders</h2>
//           {orders?.length === 0 && (
//             <div style={{ padding: "20px" }}>
//               you don&apos;t have orders yet.
//             </div>
//           )}
//           {/* ordered items */}
//           <div>
//             {orders?.map((eachOrder, i) => (
//               <div key={i}>
//                 <hr />
//                 <p>Order ID: {eachOrder?.id}</p>
//                 {eachOrder?.data?.basket?.map((order) => (
//                   <ProductCard flag cart product={order} key={order.id} />
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Orders;

import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import { db } from "../../../Utility/firebase";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../Product/ProductCard";
import Layout from "../../Layout/Layout";
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore';

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      // Firestore query to get the orders collection for the logged-in user
      const ordersCollection = collection(db, 'users', user.uid, 'orders');
      const ordersQuery = query(ordersCollection, orderBy('created', 'desc'));

      // Real-time listener for orders
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        if (!snapshot.empty) {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        } else {
          setOrders([]);
        }
      }, (error) => {
        console.error("Error fetching orders:", error);
        // Optionally show a user-friendly message or UI indication
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders.length === 0 ? (
            <div style={{ padding: "20px" }}>
              You don't have any orders yet.
            </div>
          ) : (
            <div>
              {orders.map(({ id, data }) => (
                <div key={id}>
                  <hr />
                  <p>Order ID: {id}</p>
                  {data.basket?.map((order) => (
                    <ProductCard key={order.id} flag cart product={order} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
