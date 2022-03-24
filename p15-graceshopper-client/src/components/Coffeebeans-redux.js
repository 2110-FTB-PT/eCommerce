/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { useNavigate } from 'react-router-dom'; 
import React, { useState, useEffect, useContext } from 'react';
import { getCoffeebeans } from '../axios'; 
import { 
  ItempixContext, 
  ShopcartContext
} from './'; 
import '../css/Coffeebeans.css'; 


const Coffeebeans  = () => {  
  const [items, setItems] = useState([]); 
  const [productnum, setProductnum] = useState(0); 
  const [msg, setMsg] = useState(''); 
  const {pics} = useContext(ItempixContext); 
  const {shopcart, setShopcart} = useContext(ShopcartContext); 
  const navigate = useNavigate(null); 
  const path = '/shopcart'; 
  const AbortCtr = new AbortController(); 
  const saleitems = {
    items: [],
    addedItems: [],
    total: 0
  }; 

  useEffect( async () => { //client/components/Coffeebeans.js 
    try { 
      const coffeeA = await getCoffeebeans({signal: AbortCtr.signal}); 
      setProductnum(coffeeA.length); 
      setItems(coffeeA); 
      saleitems.items = [...coffeeA]; 
      setMsg(`There currently are ${productnum} lbs coffee beans left in the stock`); 
    } catch (error) { throw error; } 
  }, [] ); 

  useEffect( () => { 
    return () => AbortCtr.abort(); 
  }, [] ); 

  const handleClick = (e) => {
    e.preventDefault(); 
    const cart = [...shopcart]; 
    let cartItem = cart.find(citem => citem.id === item.id);
    if (cartItem && (item.qty > 0)) {   //update new qty of selectedItem 
      cart.qty += 1; 
      item.qty -= 1; 
    } else if (item.qty > 0) {  //add new selectedItem
      cartItem = {...item}; 
      cartItem.qty = 1; 
      item.qty -= 1; 
      cart.push(cartItem); 
    } //else
    setShopcart(cart); 
    navigate(path, {replace: true}); 
  } //handleClick() 

  return <main className='page'>
    { productnum === 0 ? <p>{msg}</p> : <>
      {items.map( (item, idx) => { 
        return <div className='item' key={item.id} id={idx}>
      <img src={pics[idx]} alt={item.name} /> 
      <form className='itxt' onSubmit={handleClick}> 
        <b style={{fontSize:'24px',paddingBottom:'10px'}}>{item.name}</b>
        <p>Web ID: {item.id}</p> 
        <p>BLEND: {item.blend}</p>
        <p>AROMAS: {item.aromas}</p> 
        <p style={{fontFamily:'Georgia'}}>Price: ${item.price}/lb</p>
        <label htmlFor='quantity'>Qty:</label>
        <input className='inp' type='number' />
        <button className='inbtn' type='submit'>Add to Cart</button>
      </form> 
    </div> }) } </>}
  </main> 
} //Coffeebeans() 

export default Coffeebeans; 

