/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React, { useContext, useEffect, useState, Fragment } from 'react'; 
import { 
  LoginContext, 
  ItempixContext
} from './';  
import '../css/Orderlist.css';


const Orderlist = () => {
  const [orderitems, setOrderitems] = useState([]); 
  const {pics} = useContext(ItempixContext); 
  const {login} = useContext(LoginContext);
  const [order, setOrder] = useState(false); 


  useEffect( () => { 
    setOrder(true); 
    console.log('>>> Orderitems',orderitems); 
    const items = JSON.parse(localStorage.getItem('orderhistory')); 
    console.log('>>> Orderitems/items',items); 
    setOrderitems(items) 
  }, []); 

  return <div className='orderpage'>
    { orderitems.length > 0 ? <>
      { orderitems.map( (item, idx) => { 
        return <div className='item' key={item.id}>
          <img className='iimg' src={pics[item.imgindex]} alt={item.name} /> 
          <form className='orderform' title={idx}>
            <b style={{fontSize:'24px',paddingBottom:'10px'}}>{item.name}</b>
            <p>Web ID: <span>{item.id}</span></p> 
            <p>BLEND: {item.blend}</p>
            <p>AROMAS: {item.aromas}</p> 
            <p style={{fontFamily:'Georgia'}}>Price: $<span>{item.price}</span>/lb</p>
            <label htmlFor='quantity'>Qty: {item.addednum}</label>
            <p>Web ID: <span>{item.id}</span></p> 
          </form> 
        </div> 
      })} 
    </> : null }
  </div>
} //Orderlist() 

export default Orderlist; 
