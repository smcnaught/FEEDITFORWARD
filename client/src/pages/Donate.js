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
    if (id === "submitButton") {
      const tags=this.state.tags.split(",").map(tag => tag.trim());
      const donation = Object.assign({},this.state,{tags: tags,donorId: 1});
      API.createDonation(donation)
        .then(response =>
          console.log("response:" + JSON.stringify(response,null,2)))
    }
  }

  render = () =>
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <label for="productName">Product Name</label>
          <input name="productName" type="text" id="productName" onChange={this.handleInputChange} className="form-control"/>
          <label for="productQuantity">Product Quantity</label>
          <input name="productQuantity" type="number" id="productQuantity" onChange={this.handleInputChange} className="form-control"/>
          <div class="form-group">
            <label for="productUnit">Units</label>
            <select class="form-control" id="sel1">
              <option></option>
              <option>lb</option>
              <option>gal</option>
              <option>oz</option>
            </select>
          </div>
          <label for="expiration">Expiration</label>
          <input name="expiration" type="datetime-local" id="expiration" onChange={this.handleInputChange} className="form-control"/>
          <label for="tags">Tags</label>
          <input name="tags" type="text" id="expiration" onChange={this.handleInputChange} className="form-control"/>
        </div>
      </div>
      <div className="row">
        <button id="submitButton" className="btn btn-dark btn-md" type="submit" onClick={this.onClick}>Submit</button>
      </div>
    </div>
}

export default Donate;
