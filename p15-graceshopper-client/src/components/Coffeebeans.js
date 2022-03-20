/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { useNavigate } from 'react-router-dom'; 
import React, { useState, useEffect, useContext } from 'react';
import { getCoffeebeans } from '../axios'; 
import { 
  ShopcartContext, 
  ItempixContext, 
  ItemcountContext
} from './'; 
import '../css/Coffeebeans.css'; 


const Coffeebeans  = () => {  
  const [items, setItems] = useState([]); 
  const [productnum, setProductnum] = useState(0); 
  const [msg, setMsg] = useState(''); 
  const {pics} = useContext(ItempixContext); 
  const {shopcart, setShopcart} = useContext(ShopcartContext); 
  const {itemcount, setItemcount} = useContext(ItemcountContext); 
  const navigate = useNavigate(null); 
  const path = '/shopcart'; 
  const AbortCtr = new AbortController();  
  let coffeeA = []; 

  useEffect( async () => { //client/components/Coffeebeans.js 
    try { 
      coffeeA = await getCoffeebeans({signal: AbortCtr.signal}); 
      setProductnum(coffeeA.length); 
      setItems(coffeeA); 
      setMsg(`There currently are ${productnum} lbs coffee beans left in the stock`); 
    } catch (error) { throw error; } 
  }, [] ); 

  useEffect( () => { 
    return () => AbortCtr.abort(); 
  }, [] ); 

  const handleClick = (e) => {    //temp solution
    e.preventDefault(); 
    const item = items[e.target.title]; 
    item.addednum = e.target.children[6].value; 
    item.incartnum = itemcount + item.addednum; 
    item.index = e.target.title;
    const cart = [...shopcart]; 
    cart.push(item); 
    setShopcart(cart); 
    setItemcount(item.incartnum); 
    navigate(path, {replace: true}); 
  } //handleClick() 

  return <main className='page'>
    { productnum === 0 ? <p>{msg}</p> : <>
      {items.map( (item, idx) => { 
        return <div className='item' key={item.id} id={idx}>
      <img src={pics[idx]} alt={item.name} /> 
      <form className='itxt' title={idx} onSubmit={handleClick}> 
        <b style={{fontSize:'24px',paddingBottom:'10px'}}>{item.name}</b>
        <p>Web ID: {item.id}</p> 
        <p>BLEND: {item.blend}</p>
        <p>AROMAS: {item.aromas}</p> 
        <p style={{fontFamily:'Georgia'}}>Price: ${item.price}/lb</p>
        <label htmlFor='quantity'>Qty: </label>
        <input className='inp' type='number' />
        <button className='inbtn' type='submit'>Add to Cart</button>
      </form> 
    </div> }) } </>}
  </main> 
} //Coffeebeans() 

export default Coffeebeans; 

