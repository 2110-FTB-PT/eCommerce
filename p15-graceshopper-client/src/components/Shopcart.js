/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React, { useContext, useEffect } from 'react';
// import { connect } from 'react-redux';   //not yet done
import {
  ShopcartContext,
  ItempixContext, 
  ItemcountContext
} from './'; 
import '../css/Shopcart.css'; 


const Shopcart = () => { 
  const {shopcart} = useContext(ShopcartContext); 
  const {pics} = useContext(ItempixContext); 
  const {itemcount, setItemcount} = useContext(ItemcountContext); 

  return <main className='page'>
    { (shopcart.length <= 0) ? (<p>You have {itemcount} items in your cart</p>) : <>
      { shopcart.map( (item, idx) => { 
        return <div className='item' key={item.id}>
          <img src={pics[item.index]} alt={item.name} /> 
          <div className='itxt' key={idx}>
            <b style={{fontSize:'24px',paddingBottom:'10px'}}>{item.name}</b>
            <p>Web ID: {item.id}</p> 
            <p>BLEND: {item.blend}</p>
            <p>AROMAS: {item.aromas}</p> 
            <p style={{fontFamily:'Georgia'}}>Price: ${item.price}/lb</p>
          </div> 
        </div> }) 
      } 
    </> } 
  </main>
} //Shopcart() 

export default Shopcart; 

