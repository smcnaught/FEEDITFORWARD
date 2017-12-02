import React, {Component} from "react";

class Logout extends Component {

  componentDidMount() {
    window.localStorage.removeItem('user_id');
    window.location.href = "/";
  };

  render = () =>
    <div>
      Logging Out
    </div>
}


export default Logout;
