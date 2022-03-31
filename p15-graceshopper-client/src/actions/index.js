/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

export const LOAD_CART = 'LOAD_CART';  


export const loadingCart = () => { 
  const localcart = localStorage.getItem('cart');  
  if (localcart && Object.keys(localcart).length >= 3) {
    return JSON.parse(localcart); 
  } else { 
    return { cartitems: [], itemscount: 0, totalprice: 0 }; 
  } 
} //loadCart() 

export const action = {
  type: LOAD_CART, 
  payload: loadingCart()
} 

export const cart = loadingCart(); 

