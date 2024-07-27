import React from "react";
import Layout from "../../Layout/Layout";
import Carousel from "../../Carousel/Carousel";
import Category from "../../Category/Category";
import Product from "../../Product/Product";

function Home() {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Product />
    </Layout>
  );
}

export default Home;