/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/


//---Context
import { createContext } from 'react'; 
export const StoreContext = createContext(); 
export const ItempixContext = createContext(); 
export const ProductsContext = createContext(); 
export const ShopcartContext = createContext(); 
export const QueryitemsContext = createContext(); 
export const QuerytermContext = createContext(); 
export const MessageContext = createContext(); 
export const LoginContext = createContext(); 
export const CustomerContext = createContext(); 
export const AccountContext = createContext(); 



//---Components 
export { default as Nomatch } from './Nomatch';
export { default as Header } from './Header';
export { default as App } from './App'; 
export { default as Footer } from './Footer';
export { default as Home } from './Home'; 
export { default as Privacy } from './Privacy'; 
export { default as Coffeebeans } from './Coffeebeans';
export { default as Tealeaves } from './Tealeaves';  
export { default as Search } from './Search'; 
export { default as Queriedcoffee } from './Queriedcoffee'; 
export { default as Shopcart } from './Shopcart'; 
export { default as Login } from './Login';
export { default as Logout } from './Logout';
export { default as Signup } from './Signup'; 
export { default as User } from './User';
export { default as Thankyou } from './Thankyou'; 
export { default as Invoices } from './Invoices'; 
export { default as Orderitems } from './Orderitems'; 
export { default as Orderlist } from './Orderlist'; 
export { default as Payment } from './Payment'; 

