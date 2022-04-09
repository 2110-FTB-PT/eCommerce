/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/ 

import { useNavigate } from 'react-router-dom'; 
import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  MessageContext,
  CustomerContext, 
  LoginContext, 
  AccountContext, 
  Signup
} from './'; 
import { 
  postUser
} from '../axios'; 
import '../css/Login.css'; 


const Login = () => {
  const {setMessage} = useContext(MessageContext); 
  const {setCustomer} = useContext(CustomerContext);
  const {setLogin} = useContext(LoginContext);
  const {setAccount} = useContext(AccountContext); 

  const [emailin, setEmailin] = useState(''); 
  const [passwordin, setPasswordin] = useState(''); 
  const emailinref = useRef(null); 
  const passwordinref = useRef(null);
  const showpassinref = useRef(null); 
  const [error, setError] = useState(''); 
  const AbortCtr = new AbortController(); 
  const navigate = useNavigate(null); 
  const path = '/api/users/'; 

  useEffect( () => { 
    return () => AbortCtr.abort(); 
  }, [] ); 

  const showhidePassword = () => {
    const showpassinElm = document.getElementById('showpassin'); 
    const passwordinElm = document.getElementById('passwordin');       
    if (showpassinElm.checked) { passwordinElm.type = 'text'; } 
    else { passwordinElm.type = 'password'; } 
  } //showhidePassword() 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {   
      const user = {}; 
      user.email = emailin; 
      user.password = passwordin; 
      const data = await postUser('login', user, AbortCtr.signal); 
      if (data && data.token) { 
        setMessage(data.message);
        setLogin(true); 
        localStorage.setItem('token',data.token); 
        localStorage.setItem('user',JSON.stringify(data.user)); //user's info, invoices, etc. 
        setAccount(data.user.account); //customer's account number  
        if (data.user.fullname) { 
          let firstname = data.user.fullname.split(' '); console.log(firstname); 
          setCustomer(firstname[0]); 
          localStorage.setItem('customer', firstname[0]); 
        } 
        setEmailin('')
        setPasswordin(''); 
        document.getElementById('showpassin').checked = false; 
        navigate(path + data.user.account, {replace: true});  
      } 
    } catch (err) { 
      let errors = ''; 
      if (err && err.data) {
        if (err.data.code && err.data.message) { 
          errors = 'Code '+err.data.code+' - '+err.data.message; 
        } else if (err.data.includes('DOCTYPE')) { 
          errors = 'Code '+err.status+' - '+err.statusText;
        } 
      } else if (err && !err.data) {
        console.error(err); 
      } else {  //!err.data && !err 
        errors = 'Please contact Tech Support for technical internal issues.'; 
      } 
      setError(errors); 
    } //catch 
  } //handleLogin

  return <main>
  <div className='logmsg'>{error && <p className='error'>{error}</p>}</div>
  <div className='checkoutpage'>
    <div className='loginpage'>
        <h3 style={{paddingLeft:'0.45em'}}>RETURNING CUSTOMER</h3>
        <form autoComplete='on' onSubmit={handleLogin}>
          <fieldset>
            <label htmlFor='emailin'>Email</label>
            <input style={{width:'60%',margin:'0 0 15px 55px'}} type='email' name='emailin' ref={emailinref} value={emailin} onChange={e => setEmailin(e.target.value)} autoFocus /><br />
            <label htmlFor='passwordin'>Password</label>
            <input style={{width:'40%', margin:'0 20px'}} type='password' id='passwordin' onChange={e => setPasswordin(e.target.value)} value={passwordin} ref={passwordinref} />
            <input style={{margin:'0 10px 0 0'}} type='checkbox' id='showpassin' ref={showpassinref} onClick={showhidePassword} /> 
            <label htmlFor='showpasswd'>Show/Hide</label>            
          </fieldset>
          <div className='submit'>
            <button className='submitbtn' type='submit'>SUBMIT</button> 
          </div>
        </form>

    </div>
    <div className='guestpage'>
      <Signup /> 
    </div>
  </div>
  </main>
} //Login() 

export default Login; 

