/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import React from "react";
 
const Payment = props => {

  const handleClose = () => {
    props.setPaidsuccess(false);
  }
    //Under construction of Stripe, testing ... 
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={handleClose}>x</span>
        {props.paidmsg}
      </div>
    </div>
  );
};
 
export default Payment;

