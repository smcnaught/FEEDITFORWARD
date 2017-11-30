import React, {Component} from "react";
import API from "../utils/API";
import { withRouter } from 'react-router';


class Signup extends Component {
  state = {
    email: "",
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
              <h3>Log In</h3>
              <hr/>
              <div className="card-body">
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
