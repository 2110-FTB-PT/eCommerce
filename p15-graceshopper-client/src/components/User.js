/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
-----------
Testing sample:
user: jennifern, password: nguyen22, phone: 408-522-2323, email: jennifern@gmail.com
address: 456 Benton St, city: Santa Clara, state: CA, zipcode: 95050,
cardtype: master, paycard: 5555 5555 5555 4444
----------------------------------------------------------------------------------*/

import React, { useContext, useEffect, useState } from 'react'; 
import { 
  updateCoffeebeans, 
  createInvoice
} from '../axios'; 
import { 
  Orderitems,
  ProductsContext,
  ShopcartContext
} from './';  
import '../css/User.css';


const User = (props) => { 
  const checkout = props.checkout; 
  const {shopcart} = useContext(ShopcartContext); 
  const {setProducts} = useContext(ProductsContext);  
  const [paidsuccess, setPaidsuccess] = useState(false);
  const [order, setOrder] = useState(false); 
  const [orderitems, setOrderitems] = useState([]); 
  const [newinvoice, setNewinvoice] = useState([]); 
  const AbortCtr = new AbortController(); 

  useEffect( () => { 
    if (checkout) { 
      setPaidsuccess(true); 
    } 
  }); 

  useEffect( async () => {  
    const user = JSON.parse(localStorage.getItem('user'));
    const today = new Date().toISOString().slice(0, 10); 
    const invoice = {}; 
    if (user) { 
      invoice.userAccount = user.account;
      invoice.cardtype = user.cardtype;       //user's card can be changed anytime
      invoice.cardnumber = user.cardnumber; 
      invoice.card_exp_mon = user.card_exp_mon;
      invoice.card_exp_yr = user.card_exp_yr; 
      invoice.card_cvc = user.card_cvc; 
    } 
    if (shopcart && shopcart.length > 0) { 
      invoice.date = today; 
      invoice.products = [...shopcart.cartitems]; 
      invoice.itemscount = shopcart.itemscount; 
      invoice.subtotal = shopcart.subtotal; 
      invoice.tax = shopcart.tax;
      invoice.shipping = shopcart.shipping;
      invoice.totalprice = shopcart.totalprice; 
      //updated cart with new choice, [qty], [index, addednum, itemsXprice, note] 
      if (shopcart.cartitems.length > 0) { 
        setOrder(true); 
        setOrderitems(shopcart.cartitems); 
        try { 
          const products = await updateCoffeebeans([...shopcart.cartitems], {signal: AbortCtr.signal}); 
          setProducts(products); 
          const newinvoice = await createInvoice(invoice, {signal: AbortCtr.signal}); 
          setNewinvoice([newinvoice]); 
        } catch (error) { console.error(error); } 
      } 
    } //if cart
    let userorders = [...shopcart.cartitems]; 
    localStorage.setItem('orderhistory',JSON.stringify(userorders)); 
  }, []); 

  useEffect( () => { 
    const items = JSON.parse(localStorage.getItem('coffeebeans')); 
    for (let i=0; i < items.length; i++) { 
      if (items[i].addednum) { 
        items[i].sold = items[i].addednum; 
        delete items[i].addednum;  
      } 
    } 
    setProducts(items); 
    localStorage.removeItem('coffeebeans'); 
    localStorage.setItem('coffeebeans',JSON.stringify(items)); 
  }, []); 

  return <main>
    {checkout && <Orderitems />} 
  </main>
} //Users() 

export default User; 

