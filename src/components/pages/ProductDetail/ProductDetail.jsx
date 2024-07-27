// 
import React from 'react'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import classes from './ProductDetail.module.css'
import Layout from '../../Layout/Layout'
import Spinner from '../../Loading/Spinner'
import axios from "axios"
import { producturl } from '../../../Api/endpoints'
import ProductCard from '../../Product/ProductCard'

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const {productId} = useParams()
  
  useEffect(()=>{
    setIsLoading(true)
      axios.get(`${producturl}/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  },[])
  return (
    <Layout>
    {isLoading ? (<Spinner/>) :(
        <ProductCard 
        product={product} 
        flex={true}
        renderDesc = {true}
        />
   
   )}
   
    </Layout>
  )
}

export default ProductDetail