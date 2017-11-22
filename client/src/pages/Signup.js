import React from "react"

const Signup = props =>
<div className = "signup">
    <div className="container" id="signUp">
        <div className="row" >
            <div className="col-md-5">
                <div id="signupCard">
                    <h3>How Can I Help?</h3>
                    <hr />
                    <img className="card-img-top" 
                    src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1868&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                    alt="Food" />
                    <div className="card-body">  
                        <p>Restaurants and grocery stores are lacking resources to help them use up their excess food.  Food that is left over from a regular business day is typically thrown away resulting in millions of dollars of food being wasted.</p>
                        <p>According to the US Dept of Agriculture, in 2010 restaurants, stores and homes threw away 133 billion pounds of food.  Food waste fills up 20% of all landfills.</p>
                        <h5>There has to be a better way to use the food that is left over.</h5>
                        <p>What if there was a resource where businesses could come together to help eliminate food waste through donations to organizations in need?</p>  
                        <h5>This is where Feed it Forward can help!</h5>
                        <p>Sign up to help reduce food waste and help those in need.</p>
                    </div>
                </div>
            </div>
            
            <div className="col-md-1"> </div>
            
            <div className="col-md-5">
                <div id="signupCard">
                    <h3>Sign Up</h3>
                    <hr />
                    <div className="card-body">
                        <label for="organization">Organization Name</label>
                        
                        <input className="signupInput" name="name" type="text" />
                        
                        <label for="contact">Contact Name</label>
                        
                        <input className="signupInput" name="name" type="text" />
                        
                        <label for="phone">Phone Number</label>
                        
                        <input className="signupInput" name="phonenumber" type="text" />
                        
                        <label for="email">Email address</label>
                        
                        <input className="signupInput" name="email" type="text" />
                           
                        <label for="password">Password</label>
                        
                        <input className="signupInput" name="password" type="text" />
                        
                        <label for="address">Address</label>
                        
                        <input className="signupInput" name="address" type="text" />
                        
                        <label for="city">City</label>
                        
                        <input className="signupInput" name="city" type="text" />
                        
                        <label for="state">State</label>
                        
                        <input className="signupInput" name="state" type="text" />
                        
                        <label for="zip">Zip Code</label>
                        
                        <input className="signupInput" name="zip" type="text" />
                        
                        
                        <button className="btn btn-dark btn-md" type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

export default Signup;