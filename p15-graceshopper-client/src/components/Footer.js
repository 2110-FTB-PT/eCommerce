/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { Link } from 'react-router-dom'; 
import React from 'react';
import '../css/Footer.css'; 


const Footer = () => { 

  return <footer> 
    <Link className='footlink' to='/privacy'>PRIVACY &nbsp; POLICY</Link> 
    <p className='copyright'>Grace Shopper © 2022</p>
  </footer> 
} //Footer() 

export default Footer; 
