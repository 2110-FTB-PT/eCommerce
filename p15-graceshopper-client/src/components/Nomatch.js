/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React from 'react';
import { Notfound } from '../img'; 


const Nomatch = () => { 
  return <main>
    <img style={{width:'100%',objectFit:'cover'}} src={Notfound} alt='Page Not Found' />
  </main>
} //Nomatch() 

export default Nomatch; 
