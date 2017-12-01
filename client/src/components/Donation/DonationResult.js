import React from "react";
//import "./DonationResult.css";

export const DonationResult = props =>
  <div>
    product:&nbsp;{props.donation.productName},&nbsp;
    quantity:&nbsp;{props.donation.productQuantity}&nbsp;{props.donation.productUnit},&nbsp;
    expiration:&nbsp;{props.donation.expiration}&nbsp;
    
  </div>;

