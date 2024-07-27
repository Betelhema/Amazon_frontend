// import React from 'react'
// import Routing from './Router'
// import { useState } from 'react'
// import './App.css'
// import Header from './components/Header/Header'
// import CarouselEffect from "./components/Carousel/Carousel"
// import Category from './components/Category/Category'
// import Product from './components/Product/Product'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     <div>
//       <Header/>
//       <CarouselEffect/>
//       <Category/>
//       <Product/>
//     </div>

//     </>
//   )
// }

// export default App
import React,{useContext,useEffect} from 'react'
import Routing from "./Router"
import {auth} from "./Utility/firebase";
import { DataContext } from './components/DataProvider/DataProvider';
import { Type } from './Utility/action.type';


function App() {
  const [{user}, dispatch] = useContext(DataContext) 
  useEffect(()=>{
    // check the auth state change from sign in to sign out vice versa and if the user signed in userInfo will be populated with the user data if not userInfo becomes null
    auth.onAuthStateChanged((userInfo)=>{
      if(userInfo){
       dispatch({type: "SET_USER", user: userInfo})
      }
      else{
        dispatch({type: "SET_USER", user: null})
      }
    })
  },[])



  return (
    <Routing/>
    
  )
}

export default App