/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/ 

import React, { useEffect, useContext } from 'react'; 
import {
  Home,
  MessageContext,
  LoginContext, 
  CustomerContext,
  AccountContext, 
  ProductsContext
} from './'; 


const Logout = () => { 
  const {setMessage} = useContext(MessageContext); 
  const {setCustomer} = useContext(CustomerContext);
  const {setLogin} = useContext(LoginContext);
  const {setAccount} = useContext(AccountContext); 
  const {product, setProducts} = useContext(ProductsContext); 

  // useEffect( () => { 
  //   let items = [...products]; 
  //   for (let i=0; i < items.length; i++) { 
  //     if (items[i].addednum) { 
  //       items[i].addednum = 0; 
  //     } 
  //   } 
  //   setProducts(items); 
  // }, []) 

  useEffect( () => { 
    setMessage('You are logged out.'); 
    setCustomer('Guest'); 
    setLogin(false); 
    setAccount(''); 
    localStorage.removeItem('customer');
    localStorage.removeItem('token');   //token: email+password
    localStorage.removeItem('user');    //user's info, invoices, etc.
  }, []); 

  return <Home />; 
} //Logout() 

export default Logout; 

