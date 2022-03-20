/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import React, { useState } from 'react'; 
import { dak01, dak02, dak03, dak04, dak05, med06, med07, med08, med09, med10, 
  lgh11, lgh12, dcf13, mcf14, lcf15, org16
} from '../img'; 
import { 
  Header, 
  Home,  
  Footer,
  Privacy,
  Coffeebeans, 
  Coffeesets,
  Tealeaves,
  Teasets,
  Login, 
  Buyers,
  Search,
  Shopcart,
  Nomatch,
  MessageContext,
  LoginContext,
  BuyerContext,
  ShopcartContext,
  ItempixContext,
  ItemcountContext
} from './';  
import '../css/App.css'; 


const App = () => { 
    //temp substitution of the Cloud storage 
  const [pics, setPics] = useState([ dak01, dak02, dak03, dak04, dak05, 
    med06, med07, med08, med09, med10, lgh11, lgh12, dcf13, mcf14, lcf15, org16 ]
  );
  const [itemcount, setItemcount] = useState(0); 
  const [message, setMessage] = useState(''); 
  const [login, setLogin] = useState(false); 
  const [buyer, setBuyer] = useState({username: 'Guest'}); 
  const [shopcart, setShopcart] = useState([]); 
  const messageV = {message, setMessage}; 
  const loginV = {login, setLogin}; 
  const buyerV = {buyer, setBuyer}; 
  const shopcartV = {shopcart, setShopcart}; 
  const itempixV = {pics, setPics}; 
  const itemcountV = {itemcount, setItemcount}; 

  return <>
    <MessageContext.Provider value={messageV}>
      <LoginContext.Provider value={loginV}>
        <BuyerContext.Provider value={buyerV}>
          <ShopcartContext.Provider value={shopcartV}>
            <ItempixContext.Provider value={itempixV}>
              <ItemcountContext.Provider value={itemcountV}> 
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
              </ItemcountContext.Provider>
            </ItempixContext.Provider>
          </ShopcartContext.Provider>
        </BuyerContext.Provider>
      </LoginContext.Provider>
    </MessageContext.Provider>
  </>
} //App() 

export default App; 
