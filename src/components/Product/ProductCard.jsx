// import React from 'react';
// // import { useContext, useState } from 'react';
// import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
// import classes from './product.module.css'
// import Rating from '@mui/material/Rating';
// import { Link } from 'react-router-dom';
// // import { DataContext } from '../Context/DataProvider';


// function ProductCard({product}) {
 
  
// const { image, title, id, rating, price } = product;

// // const [state, dispatch] = useContext(DataContext)

// // const addToCart = ()=>{
// //   dispatch({type: "ADD_TO_BASKET", item: product})
// // }

// // console.log(state.basket)
//   return (
//     <div className={`${classes.card__container}`}>
//       <Link to={`/products/${id}`}>
//         <img src={image} alt="" className={classes.img_container} />
//       </Link>
//       <div>
//         <h3>{title}</h3>
        
//         <div className={classes.rating}>
//           {/* rating */}
//           <Rating value={rating.rate} precision={0.1} />
//           {/*count  */}
//           <small>{rating.count}</small>
//         </div>
//         <div>
//           {/* price */}
//          <CurrencyFormatter amount = {price}/>
//         </div>
       
//           <button className={classes.button} >
//             add to cart
//           </button>
       
//       </div>
//     </div>
//   );
// }

// export default ProductCard
import React from 'react';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
import classes from './product.module.css';
import  { useContext } from "react";
import { Type } from "../../Utility/action.type"
import { DataContext } from "../DataProvider/DataProvider";

function ProductCard({ product, flex, renderDesc}) {
  // Destructure product and handle potential undefined rating
  const { image, title, id, rating, price, description } = product || {};
  const [state,dispatch]  = useContext(DataContext);
  
  // console.log(state);

  // const ratingValue = rating?.rate || 0;
  // const ratingCount = rating?.count || 0;

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {id, title, price, image, rating, description},
    });
  };



  return (
    <div className={`${classes.card__container} ${flex ? classes.product__flexed : ""}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && 
            <div style={{ maxWidth: "750px" }}>{description}</div>
          }
        
        {rating && (  // Check if rating exists before rendering
          <div className={classes.rating}>
            <Rating value={rating.rate} precision={0.1} />
            <small>{rating.count}</small>
          </div>
        )}
        
        <div>
          {/* Render price using CurrencyFormatter component */}
          <CurrencyFormatter amount={price} />
        </div>
       
        <button className={classes.button} onClick={addToCart}>
          add to cart
        </button>
       
      </div>
    </div>
  );
}

export default ProductCard;
