/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { Link } from 'react-router-dom'; 
import React, { useContext, useState, useEffect } from 'react';
import { 
  LoginContext,
  MessageContext,
  ItempixContext, 
  ProductsContext,
  ShopcartContext,
} from './'; 
import '../css/Shopcart.css'; 


const Shopcart = (props) => { 
  const {setCheckout} = props; 
  const {message, setMessage} = useContext(MessageContext); 
  const {login} = useContext(LoginContext); 
  const {pics} = useContext(ItempixContext); 
  const {products} = useContext(ProductsContext);  
  const {shopcart} = useContext(ShopcartContext); 
  const [summary, setSummary] = useState([
    shopcart.subtotal.toFixed(2),
    shopcart.tax.toFixed(2),
    shopcart.shipping.toFixed(2),
    shopcart.totalprice.toFixed(2)]); 
  const taxrate = 0.0975; 
  const shiprate = 1.00; 
  const lowinventory = 10; 

  useEffect( () => {
    setMessage(''); 
  }, []); 

  const handleClick = (e) => {    //temp solution
    e.preventDefault(); 
    //collect info of selectedItem
    const cindex = Number(e.target.title); //title = index
    //shopcart item
    const selectedItem = shopcart.cartitems[cindex]; 
    const dbindex = selectedItem.dbindex; 
    let prevadded = 0, removal = false, found = false; 
    if (selectedItem.addednum) { 
      prevadded = selectedItem.addednum; 
      found = true; 
    } 
    selectedItem.addednum = Number(e.target.children[7].value); //coffeebeans pounds 
    //update itemscount
    shopcart.itemscount -= prevadded; 
    shopcart.itemscount += selectedItem.addednum; 
    //re-stock, check inventory 
    selectedItem.qty += prevadded; 
    if (selectedItem.qty < selectedItem.addednum) { 
      let insufficientQty = selectedItem.addednum - selectedItem.qty; 
      selectedItem.addednum -= insufficientQty;    //adjust to available qty
      e.target.children[7].value = selectedItem.addednum; 
    }  
    //price calculation, regardless of zero
    selectedItem.itemsXprice = Number(selectedItem.price) * selectedItem.addednum; 
    //qty calculation
    selectedItem.qty -= selectedItem.addednum; 
    //notify shoppers when items qty is low 
    if (selectedItem.qty <= lowinventory) { 
      selectedItem.note = 'In Stock: '+selectedItem.qty+' remaining';
      products[dbindex].note = selectedItem.note; 
    } else {  //clear any note 
      selectedItem.note = ''; 
    } 
    //cart adjustment
    if (found) { 
      shopcart.subtotal -= selectedItem.itemsXprice; 
      shopcart.tax -= selectedItem.itemsXprice * taxrate; 
      shopcart.shipping -= selectedItem.addednum * shiprate; 
    } 
    //remove selected item from cart as requested 
    if (selectedItem.addednum === 0) { 
      products[dbindex].addednum = 0;  
      shopcart.itemscount -= 1;  
      shopcart.cartitems.splice(cindex,1);  
      removal = true; 
      setMessage('Removed');
    } 
    if (shopcart.cartitems.length <= 0) { 
      shopcart.subtotal = 0.00;
      shopcart.tax = 0.00;
      shopcart.shipping = 0.00;
      shopcart.totalprice = 0.00;
    }
    if (!removal && found) {   
      products[dbindex].addednum = selectedItem.addednum;
      shopcart.itemscount += selectedItem.addednum;  
      //this setup below is to cover for when different products included in the cart
      shopcart.subtotal += selectedItem.itemsXprice; 
      shopcart.tax += selectedItem.itemsXprice * taxrate; 
      shopcart.shipping += selectedItem.addednum * shiprate; 
      shopcart.totalprice = shopcart.subtotal + shopcart.tax + shopcart.shipping; 
      //format the changes 
      shopcart.subtotal = Number(shopcart.subtotal.toFixed(2)); 
      shopcart.tax = Number(shopcart.tax.toFixed(2)); 
      shopcart.shipping = Number(shopcart.shipping.toFixed(2)); 
      shopcart.totalprice = Number(shopcart.totalprice.toFixed(2)); 
      setMessage('Updated');
    } 
    setSummary([ 
      Number.parseFloat(shopcart.subtotal).toFixed(2), 
      Number.parseFloat(shopcart.tax).toFixed(2), 
      Number.parseFloat(shopcart.shipping).toFixed(2), 
      Number.parseFloat(shopcart.totalprice).toFixed(2)]); 
    //update itemscount 
    let L = shopcart.cartitems.length, items = shopcart.cartitems;
    shopcart.itemscount = 0; 
    for (let i=0; i < L; i++) { 
      shopcart.itemscount += items[i].addednum; 
    } 
    localStorage.setItem('cart', JSON.stringify(shopcart));  
  } //handleClick() 

  return <main>
    <div>{message ? <h3 style={{color:'blue', textAlign:'center'}}>{message}</h3> : null }</div>
    <div className = 'shopcart'>
      <div className='cartpage'>
      { shopcart.cartitems.length <= 0 ? <p>You have {shopcart.cartitems.length} items in your cart</p> 
      : <> { shopcart.cartitems.map( (cartItem, idx) => { 
      return <div className='item' key={cartItem.id}>
        <img src={pics[cartItem.imgindex]} alt={cartItem.name} /> 
        <form className='cartform' title={idx} onSubmit={handleClick}>
          <b style={{fontSize:'24px',paddingBottom:'10px'}}>{cartItem.name}</b>
          <p>Web ID: <span>{cartItem.id}</span></p> 
          <p>BLEND: {cartItem.blend}</p>
          <p>AROMAS: {cartItem.aromas}</p> 
          <p style={{fontFamily:'Georgia'}}>Price: $<span>{cartItem.price}</span>/lb</p>
          <p style={{color:'blue'}}>{cartItem.note}</p>
          <label htmlFor='quantity'>Qty: </label>
          <input className='cartinp' type='number' min='0' onChange={() => setMessage('')} defaultValue={cartItem.addednum} />
          <button className='cartbtn' type='submit'>Update</button>
        </form> 
      </div> }) } </> } 
    </div>
    <div className='checkoutdiv'>
      <div id='total' className='cartsummary'>
        <p>SUBTOTAL <span className='subtotal'>${summary[0]}</span></p>
        <p>TAX <span className='subtotal'>${summary[1]}</span></p>
        <p>SHIPPING <span className='subtotal'>${summary[2]}</span></p>
        <p>TOTAL <span className='subtotal'>${summary[3]}</span></p> 
        {login && <Link className='checkoutlink' to='/api/users/payment' onClick={ () =>  setCheckout(true)}>Checkout</Link> } 
        {!login && <Link className='checkoutlink' to='/api/login' onClick={ () =>  setCheckout(true)}>Checkout</Link> }
        <Link className='shoplink' to='/api/coffeebeans'>Continue Shopping</Link>
      </div>
    </div>
    </div>
  </main>
} //Shopcart() 

export default Shopcart; 

//border-radius: 6px 0 0 6px;