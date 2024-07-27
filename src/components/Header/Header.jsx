// import React,{ useContext } from 'react'
// import classes from './Header.module.css'
// import {Link} from "react-router-dom"
// import { FaSearch } from "react-icons/fa";
// import { SlLocationPin } from "react-icons/sl";
// import { FaShoppingCart } from "react-icons/fa";
// import LowerHeader from './LowerHeader';
// import { DataContext } from '../DataProvider/DataProvider'
// import { auth } from "../../Utility/firebase";

// function Header() {
//     const [{basket},dispatch] =useContext(DataContext)

 

//   return (
//     <section className={classes.fixed}>
//       <section>
//         <section>
//             <div className={classes.header__container}>
//                 {/* logo */}
//                <div className={classes.logo__container}>
//                <Link to="/" >
//                     <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
//                 </Link>
//                 {/* delivery */}

//                 <span>
//                 <SlLocationPin />
//                 </span>
//                </div>


//                 <div className={classes.delivery}>
//                     <p>Delivered to</p>
//                     <span>Ethiopia</span>
//                 </div>

//                   {/* search bar */}
//                 <div className={classes.search}>
//                 <select name="" id="">
//                     <option value="">All</option>
//                 </select>
//                 <input type="text" placeholder='search product' />
//                 <FaSearch />
//             </div>

//             {/* other sections */}
//             <div className={classes.order__container}>

//                    <Link to="#" className={classes.language}>
//                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20151118161041" alt="US Flag image" />
//                     <select>
//                         <option value="">EN</option>
//                     </select>
//                    </Link>


//                 {/* three componenets */}
//                 {/* <Link to="">
//                     <div>
//                         <p>Sign In</p>
//                         <span>Account & Lists</span>
//                     </div>
//                 </Link> */}

// <Link to={!user && "/auth"}>
//               <div>
//                 {user ? (
//                   <>
//                     <p>Hello {user?.email.split('@')[0]}</p>
//                     <span onClick={()=>auth.signOut()}>Sign Out</span>
//                   </>
//                 ) : (
//                   <>
//                     <p>Hello, Sign In</p>
//                     <span>Account & Lists</span>
//                   </>
//                 )}
//               </div>
//             </Link>




//                 {/* Orders */}
//                 <Link to="/orders">
//                     <p>returns</p>
//                     <span>& Orders</span>
//                 </Link>

//                 {/* Cart */}
//                 <Link to="/cart" className={classes.cart}>
//                 <FaShoppingCart />
//                     <span>{basket.length}</span>
//                 </Link>
//             </div>
//             </div>



//         </section>
//     </section>
//     <LowerHeader/>
//     </section>

//   )
// }

// export default Header

import React, { useContext } from 'react';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/sl';
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase';

function Header() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  return (
    <section className={classes.fixed}>
      <section>
        <section>
          <div className={classes.header__container}>
            {/* logo */}
            <div className={classes.logo__container}>
              <Link to="/">
                <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="Amazon Logo" />
              </Link>
              {/* delivery */}
              <span>
                <SlLocationPin />
              </span>
            </div>

            <div className={classes.delivery}>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>

            {/* search bar */}
            <div className={classes.search}>
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" placeholder="search product" />
              <FaSearch />
            </div>

            {/* other sections */}
            <div className={classes.order__container}>
              <Link to="#" className={classes.language}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20151118161041"
                  alt="US Flag image"
                />
                <select>
                  <option value="">EN</option>
                </select>
              </Link>

              {/* User Account */}
              <Link to={!user && "/auth"}>
                <div>
                  {user ? (
                    <>
                      <p>Hello {user?.email?.split('@')[0]}</p>
                      <span onClick={() => auth.signOut()}>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <p>Hello, Sign In</p>
                      <span>Account & Lists</span>
                    </>
                  )}
                </div>
              </Link>

              {/* Orders */}
              <Link to="/orders">
                <p>Returns</p>
                <span>& Orders</span>
              </Link>

              {/* Cart */}
              <Link to="/cart" className={classes.cart}>
                <FaShoppingCart />
                <span>{basket.length}</span>
              </Link>
            </div>
          </div>
        </section>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
