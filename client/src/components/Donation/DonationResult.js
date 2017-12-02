import React from "react";
//import "./DonationResult.css";

export const DonationResult = props =>
  <div>
    Product: &nbsp;{props.donation.productName}&nbsp;
    Quantity: &nbsp;{props.donation.productQuantity}&nbsp;{props.donation.productUnit}&nbsp;
    {/*Expiration: &nbsp;{props.donation.expiration}&nbsp;*/}
    
  </div>;

