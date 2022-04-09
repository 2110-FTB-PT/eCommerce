/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React, { useContext, useEffect, useState } from 'react'; 
import { initcart } from '../actions'; 
import { 
  Thankyou, 
  Invoices, 
  ShopcartContext
} from './';  
import '../css/User.css';
import '../css/Orderitems.css';


const Orderitems = () => { 
  const {setShopcart} = useContext(ShopcartContext); 
  const [order, setOrder] = useState(false); 
  const [newinvoice, setNewinvoice] = useState([]); 
  const [getinvoices, setGetinvoices] = useState(false); 

  useEffect( () => { 
    setOrder(true); 
    localStorage.removeItem('cart');  
    localStorage.setItem('cart',JSON.stringify(initcart)); 
    setShopcart(initcart); 
  }, []); 

    //<Invoices /> is under construction
  return <div>
    <Thankyou order={order} />
    <div className='orders'>
      {getinvoices && <Invoices newinvoice={newinvoice} /> }
    </div> 
  </div>
} //Orderitems() 

export default Orderitems; 
