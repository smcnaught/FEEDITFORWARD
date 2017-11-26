import React from "react";
//import "./DonationResult.css";

export const DonationResult = props =>
  <div>
    product:&nbsp;{props.donation.product_name},&nbsp;
    quantity:&nbsp;{props.donation.product_quantity}&nbsp;{props.donation.product_unit},&nbsp;
    expiration:&nbsp;{props.donation.expiration}&nbsp;
    distance:&nbsp;{props.donation.distance}
  </div>;

