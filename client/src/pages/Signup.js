import React, {Component} from "react";
import API from "../utils/API";
import { withRouter } from 'react-router';


class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    organization: "",
    addressStreet: "",
    addressCity: "",
    addressState: "",
    addressZip: "",
    type: "donator",
    email: "",
    phone: "",
    password: ""
  };

  componentDidMount() {
    // could grab list of labels
  };

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  onClick = event => {
    // validate and submit
    const {id} = event.target;
    console.log("onClick: " + id);
    if (id === "submitButton") {
      const user = this.state;
      API.createUser(user)
        .then(response =>
          console.log("response:" + JSON.stringify(response, null, 2)))
      if (this.state.type === 'receiver') {     
        window.location.href= "/donations";
      }
      if (this.state.type === 'donator') {
        window.location.href= "/donate";
      }
    }
  }
  render = () =>
    <div className="signup">
      <div className="container" id="signUp">
        <div className="row">
          <div className="col-md-5">
            <div id="signupCard">
              <h3>How Can I Help?</h3>
              <hr/>
              <img className="card-img-top"
                   id="signupPic"
                   src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1868&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
                   alt="Food"/>
              <div className="card-body">
                <p>Restaurants and grocery stores are lacking resources to help them use up their excess food. Food that
                  is left over from a regular business day is typically thrown away resulting in millions of dollars of
                  food being wasted.</p>
                <p>According to the US Dept of Agriculture, in 2010 restaurants, stores and homes threw away 133 billion
                  pounds of food. Food waste fills up 20% of all landfills.</p>
                <h5>There has to be a better way to use the food that is left over.</h5>
                <p>What if there was a resource where businesses could come together to help eliminate food waste
                  through donations to organizations in need?</p>
                <h5>This is where Feed it Forward can help!</h5>
                <p>Sign up to help reduce food waste and help those in need.</p>
              </div>
            </div>
          </div>

          <div className="col-md-1"></div>

          <div className="col-md-5">
            <div id="signupCard">
              <h3>Sign Up</h3>
              <hr/>
              <div className="card-body">
                <p>
                  <label for="type">Select Role</label>
                  <br/>
                  <div class="styled-select blue semi-square">
                    <select name="type" id="type" onChange={this.handleInputChange}>
                      <option value="donator">Donator</option>
                      <option value="receiver">Receiver</option>
                    </select>
                  </div>
                </p>
                <p>
                  <label for="organization">Organization Name</label>
                  <br/>
                  <input className="signupInput" id="organization" name="organization" type="text"
                         onChange={this.handleInputChange}/>
                </p>
                <p>
                  <label for="firstName">First Name</label>
                  <br/>
                  <input className="signupInput" id="firstName" name="firstName" type="text"
                         onChange={this.handleInputChange}/>
                </p>

                <p>
                  <label for="lastName">Last Name</label>
                  <br/>
                  <input className="signupInput" id="lastName" name="lastName" type="text"
                         onChange={this.handleInputChange}/>
                </p>

                <p>
                  <label for="phone">Phone Number</label>
                  <br/>
                  <input className="signupInput" id="phone" name="phone" type="text" onChange={this.handleInputChange}/>
                </p>

                <p>
                  <label for="email">Email address</label>
                  <br/>
                  <input className="signupInput" id="email" name="email" type="text" onChange={this.handleInputChange}/>
                </p>

                <p>
                  <label for="password">Password</label>
                  <br/>
                  <input className="signupInput" id="password" name="password" type="text"
                         onChange={this.handleInputChange}/>
                </p>
                <p>
                  <label for="addressStreet">Street</label>
                  <br/>
                  <input className="signupInput" id="addressStreet" name="addressStreet" type="text"
                         onChange={this.handleInputChange}/>
                </p>

                <p>
                  <label for="addressCity">City</label>
                  <br/>
                  <input className="signupInput" id="addressCity" name="addressCity" type="text"
                         onChange={this.handleInputChange}/>
                </p>
                <p>
                  <label for="addressState">State</label>
                  <br/>
                  <input className="signupInput" id="addressState" name="addressState" type="text"
                         onChange={this.handleInputChange}/>
                </p>

                <p>
                  <label for="addressZip">Zip Code</label>
                  <br/>
                  <input className="signupInput" id="addressZip" name="addressZip" type="text"
                         onChange={this.handleInputChange}/>
                </p>
                <p>
                  <button className="btn btn-dark btn-md" type="submit" id="submitButton" onClick={this.onClick}>Submit</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}


export default withRouter(Signup);
