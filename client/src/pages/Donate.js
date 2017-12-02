import React, {Component} from "react";
import API from "../utils/API";

class Donate extends Component {

  state = {
    productName: "",
    productQuantity: 0,
    productUnit: "",
    donorId: null,
    receiverId: null,
    expiration: null,
    comments: "",
    status: "available",
    tags: ""
  };

  componentDidMount() {
    // could grab list of labels
  };

  handleInputChange = event => {
    const {name, value} = event.target;
    console.log(name + ": " + value);
    this.setState({
      [name]: value
    });
  };

  onClick = event => {
    // validate and submit
    const {id} = event.target;
    console.log("onClick: " + id);
    if (id === "donateSubmitButton") {
      const tags=this.state.tags.split(",").map(tag => tag.trim());
      const donation = Object.assign({},this.state,{tags: tags,donorId: 1});
      API.createDonation(donation)
        .then(response =>
          console.log("response:" + JSON.stringify(response,null,2)))
    }
  }

  render = () =>
  <div className="donate">
    <div className="container" id="donate">
      <div className="row">
        <div className="col-md-5" id="donateColumn1">
          <div className="donateCard">
            <h3>Enter Donation Item</h3>
            <hr />
            <div className= "card-body">
              <label htmlFor="productName">Product Name</label>
              <input name="productName" type="text" id="productName" onChange={this.handleInputChange} className="form-control"/>
              <label htmlFor="productQuantity">Product Quantity</label>
              <input name="productQuantity" type="number" id="productQuantity" onChange={this.handleInputChange} className="form-control"/>

              <div className="form-group">
                <label htmlFor="productUnit">Units</label>
                <select className="form-control" id="sel1">
                  <option></option>
                  <option>lb</option>
                  <option>gal</option>
                  <option>oz</option>
                </select>
              </div>
                <label htmlFor="expiration">Expiration</label>
                <input name="expiration" type="datetime-local" id="expiration" onChange={this.handleInputChange} className="form-control"/>
                {/*<label htmlFor="tags">Tags</label>
                <input name="tags" type="text" id="expiration" onChange={this.handleInputChange} className="form-control"/>*/}
                <button id="donateSubmitButton" className="btn btn-dark btn-md" type="submit" onClick={this.onClick}>Submit</button>
            </div>
          </div>
        </div>

        <div className="col-md-6" id="donateColumn2">
          <div className="donateCard">
            <h3>Donation Requirements</h3>
            <hr />
            <img id="donatePic" className="card-img-top"
            src="https://images.unsplash.com/photo-1511558721361-3e5af54fd5a4?auto=format&fit=crop&w=1050&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"
            alt="Food" />
            <div className="card-body">
              <p>Enter the donation items that you have available for pickup. Donations must be picked up on the same day they are offered.</p>
              <p>Enter a time frame for pickup that will allow the food to be used and not spoil.</p>
              <p>Please have donations packaged and ready for pickup at the designated reservation time.</p>
              <p>Any reservation that is not picked up by the end of business day can not be placed for donation again.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Donate;
