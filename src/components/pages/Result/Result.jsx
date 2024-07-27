// 
import React from 'react'
import { useEffect, useState } from 'react';
import classes from "./Result.module.css";
import ProductCard from '../../Product/ProductCard';
import Layout from '../../Layout/Layout'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { producturl } from '../../../Api/endpoints';
import Spinner from '../../Loading/Spinner';

function Results() {
  const [results, setresults] = useState([]);
  const { categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  console.log(categoryName);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${producturl}/products/category/${categoryName}`)
      .then((res) => {
        setresults(res.data)
        setIsLoading(false);
        console.log(res.data);
      }).catch((err) => {
        console.log(err)
        setIsLoading(false);
      })
  }, []);
  return (
    <Layout>
     <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        {isLoading ? (
        <Spinner />
      ) : (
        <div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard key={product.id} 
            renderadd={true}
            product={product} />
          ))}
        </div>
      )}
      </section>
    </Layout>
  )
}

export default Results