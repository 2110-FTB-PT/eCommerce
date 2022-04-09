/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React, { useContext } from 'react';
import {
  MessageContext,
  Orderlist
} from '.'; 
import '../css/Thankyou.css';


const Thankyou = (props) => { 
  const {message} = useContext(MessageContext); 
  const order = props.order; 

  return <div className='thankyou'>
    { message && <h4 className='msg'>{message}</h4> }
    { !order ? null : <>
      <p>Thank you for your payment. Please check email for shipping traking number. </p>
      <Orderlist /> 
    </> }
  </div> 
} //Thankyou() 

export default Thankyou; 
