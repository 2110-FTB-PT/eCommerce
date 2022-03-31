/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React, { useEffect, useContext } from 'react';
import { getCoffeebeans } from '../axios'; 
import { 
  ItempixContext,
  ShopcartContext,  
  ProductsContext
} from './'; 
import '../css/Coffeebeans.css'; 


const Coffeebeans  = () => {  
  const {pics} = useContext(ItempixContext); 
  const {shopcart, setShopcart} = useContext(ShopcartContext); 
  const {products, setProducts} = useContext(ProductsContext); 
  const AbortCtr = new AbortController();  


  useEffect( async () => {  
  //purpose: check and update the client local-cart if exists
    try {   
      const dbItems = await getCoffeebeans({signal: AbortCtr.signal}); 
      if (shopcart && shopcart.cartitems && shopcart.cartitems.length > 0) { //items in cart
          //if not yet checkout and if item in localcart is out of stock
        for (let i=0; i < shopcart.cartitems.length; i++) {    //items in cart
          let found = false, diffnum, diffprice; 
          for (let j=0; j < dbItems.length; j++) {  //product items
            if (shopcart.cartitems[i].id === dbItems[j].id) { 
              found = true; 
                //update cart-item if location changed in db 
              if (shopcart.cartitems[i].dbindex !== j) { shopcart.cartitems[i].dbindex = j; }
                //update item's latest inventory qty
              shopcart.cartitems[i].qty = dbItems[j].qty; 
                //if in-stock qty no longer enough for items in cart
              if (dbItems[j].qty < shopcart.cartitems[i].addednum) { 
                shopcart.cartitems[i].qty = dbItems[j].qty; 
                diffnum = shopcart.cartitems[i].addednum - dbItems[j].qty; 
                diffprice = shopcart.cartitems[i].price * diffnum; 
                shopcart.itemscount -= diffnum;   //adjust to available qty
                shopcart.totalprice -= diffprice; 
                shopcart.cartitems[i].addednum -= diffnum;         
                shopcart.cartitems[i].itemsXprice -= diffprice;  
                shopcart.cartitems[i].note = 'In Stock: '+dbItems[j].qty+' remaining';
                dbItems[j].note = shopcart.cartitems[i].note;
              } 
                //if product's price changed 
              if (dbItems[j].price !== shopcart.cartitems[i].price) {
                shopcart.cartitems[i].price = dbItems[j].price
                shopcart.totalprice -= shopcart.cartitems[i].itemsXprice; 
                shopcart.cartitems[i].itemsXprice = dbItems[j].price * shopcart.cartitems[i].addednum; 
                shopcart.totalprice += shopcart.cartitems[i].itemsXprice;
              } 
              if (shopcart.cartitems[i].qty <= 10) { 
                shopcart.cartitems[i].note = 'In Stock: '+shopcart.cartitems[i].qty+' remaining';
                dbItems[j].note = shopcart.cartitems[i].note; 
              } //if not many left
            } //if found
          } //for j, product items
          if (!found) {   //if item is out of stock before checkout
            shopcart.itemscount -= shopcart.cartitems[i].addednum;
            shopcart.totalprice -= shopcart.cartitems[i].itemsXprice; 
            shopcart.cartitems[i].splice(i,1);  //to remove item from cart 
          } 
        } //for i, in-cart items 
          //update client's local cart
        localStorage.setItem('cart', JSON.stringify(shopcart));    
      } //if items in cart exist 
      setProducts(dbItems); 
      console.log('>>> CbEff1-dbItems',dbItems,'products',products,'shopcart',shopcart); 
    } catch (error) { throw error; } 
  }, [] ); 

  useEffect( () => { 
    console.log('>>> CbEff2-abort'); 
    return () => AbortCtr.abort(); 
  }, [] ); 

  const handleClick = (e) => { 
    e.preventDefault();  
      //collect info
    const index = Number(e.target.title); //title = index
    const selectedItem = products[index]; 
    selectedItem.index = index;
    selectedItem.addednum = Number(e.target.children[7].value); //coffeebeans pounds 
      //pre-adjust addednum for comparison if invalid
    if (selectedItem.addednum < 0) { 
      selectedItem.addednum = 0; 
    } 
      //adjust addednum if not enough items in stock
    if (selectedItem.qty < selectedItem.addednum) { 
      let insufficientQty = selectedItem.addednum - selectedItem.qty; 
      selectedItem.addednum -= insufficientQty;    //adjust to available qty
    } 
      //notify shoppers when items qty is low 
    if (selectedItem.qty <= 10) { 
      selectedItem.note = 'In Stock: '+selectedItem.qty+' remaining';
      products[index].note = selectedItem.note; 
    }    
    let done = false, found = false;
    for (let i=0; i < shopcart.cartitems.length; i++) { 
      if (shopcart.cartitems[i].id === selectedItem.id) { 
        found = true; 
        const prevnum = shopcart.cartitems[i].addednum; 
        const prevprice = shopcart.cartitems[i].itemsXprice; 
        shopcart.cartitems[i].addednum = selectedItem.addednum; //new choice 
          //remove items from cart
        if (shopcart.cartitems[i].addednum === 0) { 
          shopcart.itemscount -= prevnum;
          shopcart.totalprice -= prevprice; 
          shopcart.cartitems[i].splice(i, 1);        
          done = true; 
        } 
          //re-calculate if items changed 
        if (!done || prevnum !== selectedItem.addednum) {
          shopcart.cartitems[i].qty += prevnum; 
          shopcart.cartitems[i].qty += selectedItem.addednum; 
          shopcart.cartitems[i].itemsXprice = selectedItem.addednum * selectedItem.price;
          shopcart.itemscount -= prevnum; 
          shopcart.itemscount += selectedItem.addednum; 
          shopcart.totalprice -= prevprice; 
          shopcart.totalprice += shopcart.cartitems[i].itemsXprice; 
        } 
      } //if found 
    } //for i
    if (!found) {   //database doesn't send out-of-stock items 
      selectedItem.qty = selectedItem.qty - selectedItem.addednum; 
      selectedItem.itemsXprice = selectedItem.addednum * selectedItem.price; 
      shopcart.itemscount += selectedItem.addednum; 
      shopcart.totalprice += selectedItem.itemsXprice; 
      shopcart.cartitems.push(selectedItem); 
    } 
    if (selectedItem.qty === 0) {   //items in cart reach to max qty 
      selectedItem.note === 'Out Of Stock';
      e.target.children[7].disabled = true; 
    } 
    if (selectedItem.qty > 0 && e.target.children[7].disabled === true) { 
      e.target.children[7].disabled = false; 
    } 
    localStorage.setItem('cart', JSON.stringify(shopcart));  //update local db 
    console.log('>>> Cb-click-shopcart',shopcart); 
    e.target.children[7].value = '';  
  } //handleClick() 

  return <main className='page'>
    { products === 0 ? <p>There are ${products.length} lbs coffee beans left in the stock</p> 
      : <> {products.map( (prodItem, idx) => { 
        return <div className='item' key={prodItem.id} id={idx}>
          <img src={pics[idx]} alt={prodItem.name} /> 
          <form className='cbform' title={idx} onSubmit={handleClick}> 
            <b style={{fontSize:'24px',paddingBottom:'10px'}}>{prodItem.name}</b>
            <p>Web ID: <span>{prodItem.id}</span></p> 
            <p>BLEND: {prodItem.blend}</p>
            <p>AROMAS: {prodItem.aromas}</p> 
            <p style={{fontFamily:'Georgia'}}>Price: $<span>{prodItem.price}</span>/lb</p>
            <p style={{color:'blue'}}>{prodItem.note}</p>
            <label htmlFor='quantity'>Qty: </label>
            <input className='cbinp' type='number' /> 
            <button className='cbbtn' type='submit'>Submit</button>
          </form> 
        </div> }) } 
      </>}
    </main> 
} //Coffeebeans() 

export default Coffeebeans; 
