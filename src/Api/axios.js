// import axios from "axios";

//  const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:5001/clo-c1846/us-central1/api",
//   // http://127.0.0.1:5000
//   // https://amazon-backend-s6nl.onrender.com (backend url deployed on render)
//   // baseURL: "http://127.0.0.1:5001/clone-97f4e/us-central1/api" (firebase backend)
// });

// export {axiosInstance}

import axios from "axios";

 const axiosInstance = axios.create({
  //locale instance vertion of 

  // baseURL: "http://localhost:5000",

  //render
  
  baseURL: "https://amazone-api-deploy-mhv2.onrender.com/",
  
  // http://127.0.0.1:5000
  // https://amazon-backend-s6nl.onrender.com (backend url deployed on render)
  // baseURL: "http://127.0.0.1:5001/clone-97f4e/us-central1/api" (firebase backend)
});

export {axiosInstance}