import React, {Component} from "react";
import API from "../utils/API";
import { withRouter } from 'react-router';


class Landing extends Component {

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
        .then(response => {
          console.log("Here:", response);
          window.localStorage.setItem('user_id', response.data.id)
          if (this.state.type === 'receiver') {     
            window.location.href= "/donations"; 
          }
          if (this.state.type === 'donator') {
            window.location.href= "/donate";
          }
        })
    }
  }

  render = () =>
    <div className="container" id="landing">
    </div>
}


export default withRouter(Landing);
