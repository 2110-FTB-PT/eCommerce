/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/


//---Context
import { createContext } from 'react'; 
export const MessageContext = createContext(); 
export const LoginContext = createContext(); 
export const BuyerContext = createContext(); 
export const ShopcartContext = createContext(); 
export const ItempixContext = createContext(); 
export const ItemcountContext = createContext(); 


//---Components 
export { default as App } from './App'; 
export { default as Header } from './Header';
export { default as Home } from './Home'; 
export { default as Footer } from './Footer';
export { default as Privacy } from './Privacy'; 
export { default as Coffeebeans } from './Coffeebeans'; 
export { default as Coffeesets } from './Coffeesets'; 
export { default as Tealeaves } from './Tealeaves'; 
export { default as Teasets } from './Teasets'; 
export { default as Search } from './Search'; 
export { default as Shopcart } from './Shopcart'; 
export { default as Login } from './Login';
export { default as Buyers } from './Buyers';
export { default as Nomatch } from './Nomatch'; 
export { default as cartReducer } from './reducers/cartReducer'; 
export { 
  addToCart
} from './actions/action'; 

