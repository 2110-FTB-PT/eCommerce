/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React, { useContext, useEffect } from 'react';
import { 
  ItempixContext, 
  ShopcartContext
} from './'; 
import '../css/Shopcart.css'; 


const Shopcart = () => { 
  const {pics} = useContext(ItempixContext); 
  const {shopcart} = useContext(ShopcartContext); 

  useEffect( () => { 
    console.log('>>> 1.ShEff-shopcart',shopcart);
  }, [shopcart]); 

  const checkout = () => { 

  } //checkout() 

  const handleClick = (e) => {    //temp solution
    e.preventDefault(); 
    console.log('>>> 1.shClk-b4changes/shopcart',shopcart); 
      //collect info
    const idx = Number(e.target.title); //title = index
    const prevnum = shopcart.cartitems[idx].addednum; 
    const prevprice = shopcart.cartitems[idx].itemsXprice; 
    shopcart.cartitems[idx].addednum = Number(e.target.children[7].value);    
      //pre-adjust addednum for comparison if invalid
    if (shopcart.cartitems[idx].addednum < 0) { 
      shopcart.cartitems[idx].addednum = 0; 
    } 
      //adjust addednum if not enough items in stock
    if (shopcart.cartitems[idx].qty < shopcart.cartitems[idx].addednum) { 
      let insufficientQty = shopcart.cartitems[idx].addednum - shopcart.cartitems[idx].qty; 
      shopcart.cartitems[idx].addednum -= insufficientQty; //adjust to available qty
    }
      //notify shoppers when items qty is low 
    if (shopcart.cartitems[idx].qty <= 10) { 
      let note = 'In Stock: '+shopcart.cartitems[idx].qty+' remaining';
      e.target.replaceChild(<p style={{color:'blue'}}>{note}</p>, e.target.children[5]); 
    } 
    console.log('>>> addednum',shopcart.cartitems[idx].addednum,'idx',idx); 
      //remove items from cart
    if (shopcart.cartitems[idx].addednum === 0) {  
      shopcart.itemscount -= prevnum;
      shopcart.totalprice -= prevprice; 
      let A = [...shopcart.cartitems]; console.log('>>> A',A); 
      A.splice(idx,1); console.log('>>> A-spliced',A); 
      shopcart.cartitems = A; console.log('>>> shopcart.cartitems',shopcart.cartitems); 
    }
      //re-calculate if items changed 
    if (prevnum !== shopcart.cartitems[idx].addednum) {  
      shopcart.cartitems[idx].qty += prevnum;
      shopcart.cartitems[idx].qty -= shopcart.cartitems[idx].addednum; 
      shopcart.cartitems[idx].itemsXprice = shopcart.cartitems[idx].addednum * shopcart.cartitems[idx].price;
      shopcart.itemscount -= prevnum; 
      shopcart.itemscount += shopcart.cartitems[idx].addednum;
      shopcart.totalprice -= prevprice; 
      shopcart.totalprice += shopcart.cartitems[idx].itemsXprice;  
    }
    let newnum = shopcart.cartitems[idx].addednum; 
    // e.target.replaceChild( <input className='cartinp' type='number' min='0' 
    //   placeholder={newnum} />, e.target.children[7]); 
    localStorage.setItem('cart', JSON.stringify(shopcart));  //update local db 
    console.log('>>> shClick-updated-shopcart',shopcart); 
    e.target.children[7].value = '';  

  } //handleClick() 

  return <main className='shopcart'>
    <div className='checkoutdiv'>
      <button className='checkoutbtn' type='submit' onClick={checkout}>Checkout</button>
    </div>
    <div className='page'>
    { shopcart.cartitems.length <= 0 ? <p>You have {shopcart.cartitems.length} items in your cart</p> 
    : <> { shopcart.cartitems.map( (cartItem, idx) => { 
      return <div className='item' key={cartItem.id}>
        <img src={pics[cartItem.index]} alt={cartItem.name} /> 
        <form className='cartform' title={idx} onSubmit={handleClick}>
          <b style={{fontSize:'24px',paddingBottom:'10px'}}>{cartItem.name}</b>
          <p>Web ID: <span>{cartItem.id}</span></p> 
          <p>BLEND: {cartItem.blend}</p>
          <p>AROMAS: {cartItem.aromas}</p> 
          <p style={{fontFamily:'Georgia'}}>Price: $<span>{cartItem.price}</span>/lb</p>
          <p style={{color:'blue'}}>{cartItem.note}</p>
          <label htmlFor='quantity'>Qty: </label>
          <input className='cartinp' type='number' min='0' placeholder={cartItem.addednum} />
          <button className='cartbtn' type='submit'>Update</button>
        </form> 
      </div> }) } </> } 
    </div>
  </main>
} //Shopcart() 

export default Shopcart; 

//border-radius: 6px 0 0 6px;