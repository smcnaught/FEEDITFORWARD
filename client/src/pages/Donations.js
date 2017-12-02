import React, {Component} from "react";
import API from "../utils/API";
import {FacetGroup} from "../components/Facets/FacetGroup";
import {DonationResult} from "../components/Donation/DonationResult";
import {List, ListItem} from "../components/List";
import Navbar from "../components/Navbar/Navbar";

class Donations extends Component {

  state = {
    receiverId: -1,
    donations: [],
    reservedItems: [],
    tags: [],
    tagFacets: []
  };

  componentDidMount() {
    const userId = window.localStorage.getItem('user_id');

    if (userId) {
      API.getUserById(userId).then(response => {
        this.getAllDonations(response.data.id);
      })
        .catch((err) => {
          console.log(err);
          window.localStorage.removeItem('user_id');
        });
    }
    else {
      window.location.href = "/";
    }

  };

  getAllDonations = (receiverId) => {
    API.getDonations()
      .then(res => {
          console.log("res", res);
          const donations = res.data.filter(donation => donation.status === "available");
          const reservedItems = res.data.filter(donation => (donation.receiverId === receiverId && donation.status === "reserved"));
          this.setState(
            {
              receiverId: receiverId,
              donations: donations,
              reservedItems: reservedItems
            });
        }
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFacetCheck = event => {
    const {id} = event.target;
    console.log("handleFacetCheck: " + id);
    const newTagFacets = this.state.tagFacets.map(tagFacet => {
      if (tagFacet.key === id) {
        return Object.assign(tagFacet, {isSelected: !tagFacet.isSelected});
      }
      else {
        return tagFacet;
      }
    });
    const activeTags = newTagFacets.reduce((a, e) => {
      if (e.isSelected) {
        a.push(e.key);
      }
      return a;
    }, []);
    if (activeTags.length > 0) {

      const query = {
        "terms": {"tags": activeTags}
      };
      API.searchDonations(query)
        .then(res => {
            this.setState(
              {
                donations: res.data.results,
                tags: res.data.tags,
                tagFacets: newTagFacets
              });
          }
        )
        .catch(err => console.log(err));
    }
    else {
      this.componentDidMount();
    }
  };
  saveItem = (event) => {
    let itemId = event.target.id;
    let receiverId = this.state.receiverId;

    API.reserveItem(receiverId, itemId)
      .then(item => {
        console.log("it saved my food", item);
        this.getAllDonations(receiverId);
      })
      .catch(error => console.log("there was an error", error));
  };

  removeItem = event => {
    let itemId = event.target.id;
    let receiverId = this.state.receiverId;
    API.unreserveItem(itemId)
      .then(item => {
        console.log('it worked to unreserve the item');
        this.getAllDonations(receiverId);
      })
      .catch(error => console.warn('there was an error unreserving the item', error));
  }


  render = () => {
    //console.log(this.state);
    return <div className="donations">
      <Navbar/>
      <div className="jumbotron jumbotron-fluid" id="receiveJumbotron">
        <div className="container">
          <h1>Welcome</h1>
          <h2>Search for food that is available for pickup</h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-5" id="donationColumn2">
            <div className="donationCard">
              <div className="card-body">
                <h5>Donation Items Available</h5>
                <hr/>
                <div>
                  <List>
                    {
                      this.state.donations.filter(donation => donation.status === "available")
                        .map(donation =>
                          <ListItem key={donation.id}>
                            <DonationResult donation={donation}/>
                            <button id={donation.id} className="btn btn-dark btn-md" type="submit"
                                    onClick={this.saveItem}>Reserve
                            </button>
                          </ListItem>
                        )
                    }
                  </List>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6" id="donationColumn3">
            <div className="donationCard">
              <h5>Items to Pick Up</h5>
              <hr/>
              <div className="card-body">
                <div>
                  <List>
                    {
                      this.state.reservedItems.map(item =>
                        <ListItem key={item.id}>
                          <DonationResult donation={item}/>
                          <button id={item.id} className="btn btn-dark btn-md" onClick={this.removeItem}>Remove</button>
                        </ListItem>
                      )
                    }
                  </List>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default Donations;
