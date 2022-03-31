/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { LOAD_CART, loadingCart } from '../actions'; 


export const cartReducer = ( state = loadingCart(), action ) => { 
//simple case does the same thing as default for a reducer-case demo
//other 'in-progress' cases were removed for clean looking codes
  switch (action.type) {
    case LOAD_CART:       
      loadingCart();    
    default:              
      return state; 
  } //switch 
} //cartReducer() 

