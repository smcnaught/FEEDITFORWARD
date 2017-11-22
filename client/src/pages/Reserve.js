import React from "react";

const Reserve = props =>  
<div className= "reserve">  
    <div className= "jumbotron jumbotron-fluid" id="receiveJumbotron">
        <div className="container">
            <h1>Welcome</h1>
            <h2>Search for food that is available for pickup</h2>
        </div>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-md-5">
                <h5>Search for Available Food Items</h5>
                <div className="input-group">
                    
                    <input name="search" type="text" id="searchInput" className="form-control" />
                    <button className="btn btn-dark btn-md" type="submit">Search</button>
                </div>
                
                <hr/>
                <h5>Donation Items Available</h5>
                <div>
                    <input name="donation" type="text" id="donationAvailable" placeholder="donation available" className="form-control" />
                    <input name="checkbox" type="checkbox" id="checkbox" />
                    <label for="checkbox">Check to Select</label>
                    <br/>
                    <button className="btn btn-dark btn-md" type="submit">Reserve</button>
                </div>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-4">
                <h5>Items to Pick Up</h5>
                <div> 
                    <input name="pick-up" type="text" id="pick-up" placeholder="pick-up" className="form-control" />
                    <input name="checkbox" type="checkbox" id="checkbox" />
                    <label for="checkbox">Check to Remove</label>
                    
                    <button className="btn btn-dark btn-md" type="submit">Remove</button>
                    <button className="btn btn-dark btn-md" type="submit">Select for Pickup</button>
                </div>
            </div>
        </div>
    </div>
</div>

export default Reserve;
