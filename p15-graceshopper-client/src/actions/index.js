/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

export const LOAD_CART = 'LOAD_CART'; 

export const initcart = {
  cartitems: [], 
  itemscount: 0, 
  subtotal: 0.00, 
  tax: 0.00, 
  shipping: 0.00,
  totalprice: 0.00
}; 

export const loadingCart = () => {  

  if (localStorage.getItem('cart')) {
    const localcart = JSON.parse(localStorage.getItem('cart')); 
    if (localcart && Object.keys(localcart).length > 5) {
      return localcart;  
    } 
  } else { 
    return initcart; 
  } 
} //loadingCart() 

export const action = {
  type: LOAD_CART, 
  payload: loadingCart()
} 

export const cart = loadingCart(); 

