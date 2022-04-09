/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/ 

import { useNavigate } from 'react-router-dom'; 
import React, { useState, useContext, useRef, useEffect } from 'react';
import { 
  MessageContext,
  LoginContext,
  CustomerContext, 
  AccountContext
} from '.'; 
import { 
  postUser
} from '../axios'; 
import '../css/Login.css'; 


const Signup = () => { 
  const {setMessage} = useContext(MessageContext); 
  const {setCustomer} = useContext(CustomerContext);
  const {login, setLogin} = useContext(LoginContext);
  const {setAccount} = useContext(AccountContext); 

  const [emailup, setEmailup] = useState(''); 
  const [passwordup, setPasswordup] = useState(''); 
  const [confirmpassup, setConfirmpassup] = useState('');
  const emailupref = useRef(null); 
  const passwordupref = useRef(null);
  const confirmpassupref = useRef(null); 
  const showpassupref = useRef(null); 

  const [fullname, setFullname] = useState(''); 
  const [phone, setPhone] = useState('');
  const fullnameref = useRef(null); 
  const phoneref = useRef(null);

  const [shipaddress, setShipaddress] = useState(''); 
  const [sameaddress, setSameaddress] = useState(true); 
  const [address, setAddress] = useState(''); 
  const [city, setCity] = useState(''); 
  const [state, setState] = useState(''); 
  const [zipcode, setZipcode] = useState(''); 
  const shipaddressref = useRef(null); 
  const sameaddressref = useRef(null); 
  const addressref = useRef(null); 
  const cityref = useRef(null); 
  const stateref = useRef(null); 
  const zipcoderef = useRef(null); 

  const [cardtypes] = useState([ {cardtype: ''}, 
    {cardtype: 'Visa'}, {cardtype: 'Master'}, {cardtype: 'Discover'}]); 
  const [cardtype, setCardtype] = useState(''); 
  const [cardnumber, setCardnumber] = useState(''); 
  const cardtyperef = useRef(null); 
  const cardnumberref = useRef(null); 

  const [expiremonths] = useState([ {month: ''},
    {month: 'Jan'}, {month: 'Feb'}, {month: 'Mar'}, {month: 'Apr'}, {month: 'May'}, {month: 'Jun'},
    {month: 'Jul'}, {month: 'Aug'}, {month: 'Sep'}, {month: 'Oct'}, {month: 'Nov'}, {month: 'Dec'}])
  const [cardExpMon, setCardExpMon] = useState(''); 
  const [expireyears] = useState([ {year: ''},
    {year: '2022'}, {year: '2023'}, {year: '2024'}, {year: '2025'}, {year: '2026'}]);
  const [cardExpYr, setCardExpYr] = useState(''); 
  const [cardCVC, setCardCVC] = useState(''); 
  const cardExpMonref = useRef(null); 
  const cardExpYrref = useRef(null); 
  const cardCVCref = useRef(null); 

  const [error, setError] = useState(''); 
  const AbortCtr = new AbortController(); 
  const navigate = useNavigate(null); 
  let path = '/api/users/'; 
  let task = 'register'; 

  useEffect( () => { 
    return () => AbortCtr.abort(); 
  }, [] ); 

  const showhidePassword = (e) => {
    const passwordupElm = document.getElementById('passwordup'); 
    const confirmpassupElm = document.getElementById('confirmpassup');           
    if (e.target.checked) { 
      passwordupElm.type = 'text'; 
      confirmpassupElm.type = 'text'; 
      } 
    else { 
      passwordupElm.type = 'password'; 
      confirmpassupElm.type = 'password'; 
    } 
  } //showhidePassword() 

  const handleNewuser = async (e) => { 
    e.preventDefault();  
    if (passwordup && passwordup !== confirmpassup) { //email validated
      alert('Passwords not matching!'); //stay at Login 
      return;
    }
    const user = {}; 
    user.email = emailup; 
    user.password = passwordup;
    user.fullname = fullname; 
    user.phone = phone; 
    if (!sameaddress) { 
      user.shipaddress = shipaddress; 
    } else { 
      user.shipaddress = address+' '+city +' '+state+' '+zipcode; 
    }  
    user.address = address; 
    user.city = city; 
    user.state = state; 
    user.zipcode = zipcode; 
    user.cardtype = cardtype; 
    user.cardnumber = cardnumber; 
    user.card_exp_mon = cardExpMon; 
    user.card_exp_yr = cardExpYr;  
    user.card_cvc = cardCVC; 
    try {   
      const data = await postUser(task, user, AbortCtr.signal); 
      if (data) { 
        if (data.message) setMessage(data.message);
        if (data.token) { 
          localStorage.setItem('token',data.token);   //token: email+password
          setLogin(true); 
        } 
        if (data.user) { 
          localStorage.setItem('user',JSON.stringify(data.user)); //user's info, invoices, etc.
          setAccount(data.user.account); //customer's account number
          path = path + data.user.account; 
          if (data.user.fullname) { 
            let firstname = data.user.fullname.split(' '); 
            setCustomer(firstname[0]); 
            localStorage.setItem('customer', firstname[0]); 
          } 
        } 
      } 
      setEmailup('')
      setPasswordup('');
      setFullname(''); 
      setShipaddress(''); 
      setAddress(''); 
      setCity(''); 
      setState(''); 
      setZipcode(''); 
      setPhone(''); 
      setConfirmpassup('');  
      setCardtype('');
      setCardExpMon('');
      setCardExpYr(''); 
      setCardCVC(''); 
      document.getElementById('showpassup').checked = false; 
      document.getElementById('confirmpassup').checked = false; 
      navigate(path, {replace: true}); 
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
  } //handleNewuser() 


  return <div>
    <div  style={{color:'red', float:'right'}}>{error ? <h3>{error}</h3> : null }</div>
    <div> 
      <h3>NEW CUSTOMER</h3>
      <p>Information needed: shipping address, credit/debit, and purchase contact email.</p> 
      <p>Required <span style={{color:'red'}}>*</span></p>
      <form autoComplete='on' onSubmit={handleNewuser}>
        {/* ---------- fullname, address, city, state, zipcode, shipaddress, phone */}
        <fieldset> 
          <label htmlFor='fullname'>Full Name (First Last)
            <span style={{color:'red'}}>*</span>
          </label>
          <input style={{width:'43%',margin:'0 0 15px 30px'}} name='fullname' ref={fullnameref} value=  {fullname} onChange={e => setFullname(e.target.value)} required /><br />
          <label htmlFor='address'>Billling Address
            <span style={{color:'red'}}>*</span>
          </label>
          <input style={{width:'70%',margin:'0 0 15px 30px'}} name='address' ref={addressref} value={address} onChange={e => setAddress(e.target.value)} required /><br />
          <label htmlFor='city'>City</label>
          <input style={{width:'30%',margin:'0 30px 15px 30px'}} name='city' ref={cityref} value={city}   onChange={e => setCity(e.target.value)} />
          <input style={{margin:'15px'}} type='checkbox' id='sameaddress' ref={sameaddressref} onClick={  e => setSameaddress(e.target.checked)} /> 
          <label htmlFor='sameaddress'>Same Shipping Address</label><br /> 
          <label htmlFor='state'>State</label>
          <input style={{width:'10%',margin:'0 30px 15px 20px'}} name='state' ref={stateref} value={state} onChange={e => setState(e.target.value)} />
          <label htmlFor='zipcode'>Zip Code
            <span style={{color:'red'}}>*</span>
          </label>
          <input style={{width:'10%',margin:'0 30px 15px 20px'}} name='zipcode' ref={zipcoderef} required value={zipcode} onChange={e => setZipcode(e.target.value)} />
          <label htmlFor='phone'>Phone</label>
          <input style={{width:'28%',margin:'0 0 15px 20px'}} name='phone' ref={phoneref} value={phone} onChange={e => setPhone(e.target.value)} /><br />
          <label htmlFor='uname'>Different Shipping Address (Adderss, City, State, Zip code, Country)</label>
          <input style={{width:'97%',margin:'0'}} name='shipaddress' ref={shipaddressref}value={shipaddress} onChange={e => setShipaddress(e.target.value)} />
        </fieldset>
        {/* ---------- email, password, confirmpassword */}
        <fieldset>
          <label htmlFor='email'>Email
            <span style={{color:'red'}}>*</span>
          </label>
          <input style={{width:'60%',margin:'0 0 15px 120px'}} type='email' name='emailup' ref= {emailupref} value={emailup} onChange={e => setEmailup(e.target.value)} required /><br />
          <label htmlFor='passwordup'>Password
            <span style={{color:'red'}}>*</span>
          </label>
          <input style={{width:'40%',margin:'0 0 15px 93px'}} type='password' id='passwordup' ref={passwordupref} value={passwordup} onChange={e => setPasswordup(e.target.value)} /><br />
          <label htmlFor='confirmpassup'>Confirm Password
            <span style={{color:'red'}}>*</span>
          </label>
          <input style={{width:'40%', margin:'0 20px'}} type='password' id='confirmpassup' ref={confirmpassupref} value={confirmpassup} onChange={e => setConfirmpassup(e.target.value)} />
          <input style={{margin:'0 10px 0 0'}} type='checkbox' id='showpassup' ref={showpassupref}  onClick={showhidePassword} /> 
          <label htmlFor='showpassup'>Show/Hide</label>
        </fieldset>
        {/* ---------- cardtype, cardnumber, cardExpMon, cardExpYr */}
        <fieldset>
          <label style={{marginRight: '90px'}} htmlFor='cardtype'>Card Type
            <span style={{color:'red'}}>*</span>
          </label>
          <label style={{marginRight: '35px'}} htmlFor='cardExpMon'>Expiration Month
            <span style={{color:'red'}}>*</span>
          </label>
          <label htmlFor='expiredyear'>Expiration Year
            <span style={{color:'red'}}>*</span>
          </label>
          <select className='dropdown' name='cardtype' onChange={e => setCardtype(e.target.value)} ref={cardtyperef} required>
          { cardtypes.map( (item, index) => { 
            return <option key={index} defaultValue=''>{item.cardtype}</option> }) 
          }
          </select>
          <select className='dropdown' name='cardExpMon' onChange={e => setCardExpMon(e.target.value)} ref={cardExpMonref} required>
            { expiremonths.map( (item, index) => { 
              return <option key={index} defaultValue=''>{item.month}</option> }) 
            }
          </select>
          <select className='dropdown' name='cardExpYr' onChange={e => setCardExpYr(e.target.value)} ref= {cardExpYrref} required>
            { expireyears.map( (item, index) => { 
              return <option key={index} defaultValue=''>{item.year}</option> }) 
            }
          </select><br /> 
          <label style={{marginRight:'40%', width:'10%'}} htmlFor='cardnumber'>Card Number
            <span style={{color:'red'}}>*</span>
          </label>
          <label htmlFor='cardcvc'>Card CVC/CVV
            <span style={{color:'red'}}>*</span>
          </label><br />
          <input style={{marginRight:'10%', width:'47%'}} name='cardnumber' onChange={e => setCardnumber(e.target.value)} ref={cardnumberref} required />
          <input style={{width:'10%'}} name='cardcvc' onChange={e => setCardCVC(e.target.value)} ref={cardCVCref} required />
        </fieldset> 
        {/* ---------- submit button ---*/} 
        <div className='submit'>
          <button className='submitbtn' type='submit'>SUBMIT</button> 
        </div>
      </form>
    </div>
  </div> 
} //Signup() 

export default Signup; 
