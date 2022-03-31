/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import React, { useState, useEffect, useContext } from 'react'; 
import { cartReducer } from '../reducers'; 
import { dak01, dak02, dak03, dak04, dak05, med06, med07, med08, med09, med10, 
  lgh11, lgh12, dcf13, mcf14, lcf15, org16
} from '../img'; 
import { 
  Home,  
  Footer,
  Privacy,
  Shopcart,
  Header, 
  Coffeebeans, 
  Coffeesets,
  Tealeaves,
  Teasets,
  Search,
  Login, 
  Buyers,
  Nomatch,
  StoreContext, 
  ItempixContext,
  ShopcartContext,
  ProductsContext, 
  CartitemsContext,
  MessageContext,
  LoginContext,
  BuyerContext
} from './';  
import '../css/App.css'; 


const App = () => { 
  const { store } = useContext(StoreContext); 
  store.dispatch(cartReducer); 
  const localcart = store.getState(); 
  const [shopcart, setShopcart] = useState(localcart); 
  const [pics, setPics] = useState([ dak01, dak02, dak03, dak04, dak05, 
    med06, med07, med08, med09, med10, lgh11, lgh12, dcf13, mcf14, lcf15, org16 ]
  );
  const [products, setProducts] = useState([]); 
  const [message, setMessage] = useState(''); 
  const [login, setLogin] = useState(false); 
  const [buyer, setBuyer] = useState({username: 'Guest'}); 
  const itempixV = {pics, setPics}; 
  const shopcartV = {shopcart, setShopcart}; 
  const productsV = {products, setProducts}; 
  const messageV = {message, setMessage}; 
  const loginV = {login, setLogin}; 
  const buyerV = {buyer, setBuyer}; 

   
  useEffect( () => { 
    console.log('>>> AppEff-localcart',localcart,'shopcart',shopcart); 
  }, []); 

  return <>
    <ItempixContext.Provider value={itempixV}>
      <ShopcartContext.Provider value={shopcartV}>
        <ProductsContext.Provider value={productsV}>
          <MessageContext.Provider value={messageV}>
            <LoginContext.Provider value={loginV}>  
              <BuyerContext.Provider value={buyerV}>
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route path='/privacy' element={<Privacy />} />
                  <Route path='/api/coffeebeans' element={<Coffeebeans />} /> 
                  <Route path='/api/coffeesets' element={<Coffeesets />} /> 
                  <Route path='/api/tealeaves' element={<Tealeaves />} /> 
                  <Route path='/api/teasets' element={<Teasets />} /> 
                  <Route path='/api/login' element={<Login />} /> 
                  <Route path='/api/buyers/me' element={<Buyers />} /> 
                  <Route path='/api/search' element={<Search />} /> 
                  <Route path='/shopcart' element={<Shopcart />} /> 
                  <Route path='/*' element={<Nomatch />} />  
                </Routes> 
                <Footer /> 
              </BrowserRouter>
              </BuyerContext.Provider>
            </LoginContext.Provider>
          </MessageContext.Provider>    
        </ProductsContext.Provider>
      </ShopcartContext.Provider>
    </ItempixContext.Provider>
  </>
} //App() 

export default App; 
