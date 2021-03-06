/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React, { useEffect, useContext } from 'react';
import { 
  MessageContext,
  ItempixContext, 
  ProductsContext,
  ShopcartContext
} from './'; 
import '../css/Coffeebeans.css'; 


const Coffeebeans  = () => {  
  const {message, setMessage} = useContext(MessageContext); 
  const {pics} = useContext(ItempixContext); 
  const {products, setProducts} = useContext(ProductsContext);  
  const {shopcart, setShopcart} = useContext(ShopcartContext); 
  const taxrate = 0.0975; 
  const shipbase = 5.00; 
  const shiprate = 1.00; 
  const lowinventory = 10; 

  useEffect( () => {
    setMessage(''); 
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

  const handleClick = (e) => { 
    e.preventDefault();  
    //collect indexes 
    const dbindex = Number(e.target.title); //title = index                 
    const selectedItem = products[dbindex];                                 
    selectedItem.dbindex = dbindex;         //add index for later use       
    let cindex = 0, L = shopcart.cartitems.length;                          
    for (cindex; cindex < L; cindex++) { 
      let item = shopcart.cartitems[cindex]; 
      if (item.id === selectedItem.id) { 
        break;     
      } 
    } 
    let removed = false, found = false, hold = 0, prevAdded = 0;
    //if item is in the cart, reduction: 
    if (selectedItem.addednum) {  
      //step by step Math to cover for inconsistent behaviors from React's objects
      hold = selectedItem.qty; selectedItem.qty = hold + selectedItem.addednum;
      hold = shopcart.itemscount; shopcart.itemscount = hold - selectedItem.addednum;
      hold = shopcart.subtotal; shopcart.subtotal = hold - selectedItem.itemsXprice;
      hold = shopcart.tax; shopcart.tax = hold - (selectedItem.itemsXprice * taxrate)
      hold = shopcart.shipping; shopcart.shipping = hold - (selectedItem.addednum * shiprate);  
      found = true; 
    } 
    selectedItem.addednum = Number(e.target.children[7].value);
    //remove item from cart
    if (selectedItem.addednum <= 0) { 
      e.target.children[7].value = ''; 
      shopcart.cartitems.splice(cindex,1);  
      removed = true; 
    } 
    if (shopcart.cartitems.length <= 0) { 
      shopcart.itemscount = 0; 
      shopcart.subtotal = 0.00;
      shopcart.tax = 0.00;
      shopcart.shipping = 0.00; 
      shopcart.totalprice = 0.00;
    }
    //addition 
    if (!removed) { 
      //if not enough items in stock 
      if (selectedItem.qty < selectedItem.addednum) { 
        selectedItem.addednum = selectedItem.qty;   //adjust to available qty
        e.target.children[7].value = selectedItem.qty;
        selectedItem.qty = 0; 
      } else { 
        hold = selectedItem.qty; selectedItem.qty = hold - selectedItem.addednum; 
      } 
      //notify shoppers when items qty is low 
      if (selectedItem.qty <= lowinventory) { 
        selectedItem.note = 'In Stock: '+selectedItem.qty+' remaining';
      } else { 
        products[dbindex].note = ''; 
      } 
      //update the shopcart: [qty], [dbindex, addednum, itemsXprice, note]
      if (found) {  
        shopcart.cartitems[cindex] = {...selectedItem};
      } else {            //database doesn't send out-of-stock items 
        if (shopcart.cartitems.length === 0) { shopcart.shipping += shipbase; }   
        const newitem = {...selectedItem}; 
        shopcart.cartitems.push(newitem);                                         
      } 
      //update the price_ regardless of zero
      //this setup made ready for future use when different product lines added to cart
      selectedItem.itemsXprice = Number(selectedItem.price) * selectedItem.addednum; 
      shopcart.itemscount += selectedItem.addednum;                      
      shopcart.subtotal += selectedItem.itemsXprice;                     
      shopcart.tax += selectedItem.itemsXprice * taxrate;                
      shopcart.shipping += selectedItem.addednum * shiprate;             
      shopcart.totalprice = shopcart.subtotal + shopcart.tax + shopcart.shipping;   
    } //if not removed
    //format the changes
    shopcart.subtotal = Number.parseFloat(shopcart.subtotal.toFixed(2));          
    shopcart.tax = Number.parseFloat(shopcart.tax.toFixed(2));                    
    shopcart.shipping = Number.parseFloat(shopcart.shipping.toFixed(2));          
    shopcart.totalprice = Number.parseFloat(shopcart.totalprice.toFixed(2));       
    //re-sync, save to local 
    const cart = {...shopcart};   
    setShopcart(cart); 
    localStorage.setItem('cart', JSON.stringify(shopcart));                    
    products[dbindex] = {...selectedItem}; 
    localStorage.setItem('coffeebeans', JSON.stringify(products));              
  } //handleClick() 

  return <main>
    <div  style={{color:'blue', textAlign:'center'}}>{message ? <h3>{message}</h3> : null }</div>
    <div className='coffeepage'>
      { products.length === 0 ? <p>There are {products.length} lbs coffee beans left in the stock</p> 
      : <> {products.map( (prodItem, idx) => { 
        return <section className='item' key={prodItem.id} id={idx}>
          <img src={pics[prodItem.imgindex]} alt={prodItem.name} /> 
          <form className='cbform' title={idx} onSubmit={handleClick}> 
            <b style={{fontSize:'28px',paddingBottom:'20px'}}>{prodItem.name}</b>
            <p>Web ID: <span>{prodItem.id}</span></p> 
            <p>BLEND: {prodItem.blend}</p>
            <p>AROMAS: {prodItem.aromas}</p> 
            <p style={{fontFamily:'Georgia'}}>Price: $<span>{prodItem.price}</span>/lb</p>
            <p style={{color:'blue'}}>{prodItem.note}</p>
            <label htmlFor='quantity'>Qty: </label>
            <input className='cbinp' type='number' min='0' onChange={() => setMessage('')} defaultValue={prodItem.addednum ? prodItem.addednum : null} /> 
            <button className='cbbtn' type='submit'>Submit</button>
          </form> 
        </section> }) } 
      </>}
    </div>
  </main> 
} //Coffeebeans() 

export default Coffeebeans; 
