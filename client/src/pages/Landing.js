import React, { Component } from "react";
import API from "../utils/API";
import {List} from "../components/List/List";
import {ListItem} from "../components/List/ListItem";

class Landing extends Component {
  state = {
    donations: []
  };

  componentDidMount() {
    API.getDonations()
      .then(res => {
          this.setState(
            {
              donations: res.data
            });
        }
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
  };

  render = () =>
    <List>
      {this.state.donations.map(donation => (
        <ListItem key={donation._id}>
            <pre>
              {JSON.stringify(donation,null,2)}
            </pre>
        </ListItem>
      ))}
    </List>
}

export default Landing;
