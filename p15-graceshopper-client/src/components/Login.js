/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React, { useContext } from 'react'; 
import { 
  MessageContext 
} from './'; 
import '../css/Login.css'; 


const Login = () => { 
  const { message, setMessage } = useContext(MessageContext);

  return <main className='page'> 
    Login 
  </main> 
} //Login() 

export default Login; 
