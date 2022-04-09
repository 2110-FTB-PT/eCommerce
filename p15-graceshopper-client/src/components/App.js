/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import React, { useState, useEffect, useContext } from 'react'; 
import { dak01, dak02, dak03, dak04, dak05, med06, med07, med08, med09, med10, 
  lgh11, lgh12, dcf13, mcf14, lcf15, org16
} from '../img'; 
import { getCoffeebeans } from '../axios'; 
import { 
  Nomatch,
  Header, 
  Footer,
  Home,  
  Privacy,
  Coffeebeans, 
  Tealeaves,
  Queriedcoffee,
  Shopcart,
  Login, 
  Logout,
  User,
  ItempixContext,
  StoreContext, 
  ShopcartContext,
  ProductsContext, 
  QueryitemsContext,
  QuerytermContext, 
  MessageContext,
  LoginContext,
  CustomerContext,
  AccountContext
} from './';  
import '../css/App.css'; 


const App = () => { 
  const { store } = useContext(StoreContext); 
  const storecart = store.getState(); 
  const [shopcart, setShopcart] = useState(storecart);  
  const shopcartV = {shopcart, setShopcart}; 
  const [pics, setPics] = useState([ dak01, dak02, dak03, dak04, dak05, 
    med06, med07, med08, med09, med10, lgh11, lgh12, dcf13, mcf14, lcf15, org16 ]
  );
  const itempixV = {pics, setPics}; 
  const [products, setProducts] = useState([]); 
  const productsV = {products, setProducts}; 
  const [queryitems, setQueryitems] = useState([]); 
  const queryitemsV = {queryitems, setQueryitems}; 
  const [queryterm, setQueryterm] = useState(''); 
  const querytermV = {queryterm, setQueryterm};

  const [message, setMessage] = useState(''); 
  const messageV = {message, setMessage}; 
  const [login, setLogin] = useState(false); 
  const loginV = {login, setLogin}; 
  const [customer, setCustomer] = useState('Guest'); 
  const customerV = {customer, setCustomer}; 
  const [account, setAccount] = useState(''); //api/users/:account, account number
  const accountV = {account, setAccount}; 
  const [checkout, setCheckout] = useState(false); 
  const AbortCtr = new AbortController(); 
   
  useEffect( () => { 
    let token = localStorage.getItem('token');
    if (token) { 
      setLogin(true); 
    }
    let firstname = localStorage.getItem('customer'); 
    if (firstname) { 
      setCustomer(firstname); 
    } 
  }, []); 

  useEffect( async () => { 
    let items = JSON.parse(localStorage.getItem('coffeebeans')); 
    if (items) { 
      for (let i=0; i < items.length; i++) { 
        if (items[i].addednum) { 
          items[i].sold = items[i].addednum; 
          delete items[i].addednum;  
        } 
      } 
      localStorage.removeItem('coffeebeans'); 
    } else { 
      items = await getCoffeebeans({signal: AbortCtr.signal});  
    }
    setProducts(items); 
    localStorage.setItem('coffeebeans',JSON.stringify(items)); 
    localStorage.setItem('cart',JSON.stringify(shopcart)); 
  }, []);

  useEffect( () => { 
    return () => AbortCtr.abort(); 
  }, [] ); 

  return <>
    <ItempixContext.Provider value={itempixV}>
      <ShopcartContext.Provider value={shopcartV}>
        <ProductsContext.Provider value={productsV}>
          <QueryitemsContext.Provider value={queryitemsV}>
          <QuerytermContext.Provider value={querytermV}> 
            <MessageContext.Provider value={messageV}>
            <LoginContext.Provider value={loginV}>  
              <CustomerContext.Provider value={customerV}>
              <AccountContext.Provider value={accountV}>
                <BrowserRouter>
                  <Header checkout={checkout} />
                  <Routes>
                    <Route path='/*' element={<Nomatch />} />  
                    <Route exact path='/' element={<Home />} />
                    <Route path='/privacy' element={<Privacy />} />
                    <Route path='/api/coffeebeans' element={<Coffeebeans />} /> 
                    <Route path='/api/tealeaves' element={<Tealeaves />} />
                    <Route path='/query' element={<Queriedcoffee />} /> 
                    <Route path='/shopcart' element={<Shopcart setCheckout={setCheckout} />} /> 
                    <Route path='/api/login' element={<Login />} /> 
                    <Route path='/api/users/:account' element={<User checkout={checkout} />} /> 
                    <Route path='/api/users/payment' element={<User checkout={checkout} />} /> 
                    <Route path='/logout' element={<Logout />} />
                  </Routes> 
                  <Footer /> 
                </BrowserRouter>
              </AccountContext.Provider>
              </CustomerContext.Provider>
            </LoginContext.Provider>
            </MessageContext.Provider>
          </QuerytermContext.Provider>
          </QueryitemsContext.Provider> 
        </ProductsContext.Provider>
      </ShopcartContext.Provider>
    </ItempixContext.Provider>
  </>
} //App() 

export default App; 
