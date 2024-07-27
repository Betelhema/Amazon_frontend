
import React , { useEffect, useState } from "react"
import classes from './product.module.css'
import axios from "axios"
import ProductCard from "./ProductCard"
function Product() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(()=>{
        axios.get(
          "https://fakestoreapi.com/products"
        )
        .then((res) => {
            setProducts(res.data);
            setIsLoading(false); // Set loading to false after data is fetched
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false); // Set loading to false in case of an error
        });
}, []);
    return (
      <>
          {isLoading ? (
              <Loader />
          ) : (
              <section className={classes.products_container}>
                  {products?.map((product) => (
                      <ProductCard key={product.id} product={product} />
                  ))}
              </section>
          )}
      </>
  );
}

export default Product