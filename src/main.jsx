// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import Dataprovider from './components/DataProvider/DataProvider.jsx'
// import {reducer, initialState} from './Utility/reducer.js'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <DataProvider reducer={reducer} initialState={initialState} >
//      <App />
//     </Dataprovider>
    
//   </React.StrictMode>,
// )



import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DataProvider from "./components/DataProvider/DataProvider";
import {reducer,initialState} from './Utility/reducer'

const root = ReactDOM.createRoot(document.getElementById("root"));

 
  root.render(
    <React.StrictMode>
      <DataProvider reducer={reducer} initialState={initialState}>
        <App />
      </DataProvider>
    </React.StrictMode>
  );
 

