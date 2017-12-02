import React, {Component} from "react";
import API from "../utils/API";
import {FacetGroup} from "../components/Facets/FacetGroup";
import {DonationResult} from "../components/Donation/DonationResult";
import {List,ListItem} from "../components/List";


var colorFacetsTree = [
  {
    "key": "Any Color",
    "path": "/catalog/",
    "isSelected": true
  },
  {
    "key": "Puce",
    "path": "/catalog/",
    "isSelected": false
  }
];

var categoryFacets = [
  {
    "key": "Grabs Bars",
    "path": "/catalog/healthcare-equipment-bathing-grab-bars",
    "doc_count": 45
  },
  {
    "key": "Tub Accessories",
    "path": "/catalog/healthcare-equipment-bathing-tub-accessories",
    "doc_count": 12
  },
  {
    "key": "Bathing Lifts",
    "path": "/catalog/healthcare-equipment-bathing-bathing-lifts",
    "doc_count": 8
  }
];

var categoryFacetsTree = [
  {
    "key": "Any Category",
    "path": "/catalog/",
    "isSelected": false
  },{
    "key": "Healthcare Equipment",
    "path": "/catalog/healthcare-equipment",
    "isSelected": false
  },
  {
    "key": "Bathing",
    "path": "/catalog/healthcare-equipment-bathing",
    "isSelected": true
  }
];

class Donations extends Component {

  state = {
    donations: [],
    reservedItems: [],
    tags: [],
    tagFacets: []
    
  };

  componentDidMount() {
    this.getAllDonations();
  };

  getAllReservedItems = () => {
    const userId = 1;// TODO: fix this to get from user session
    API.getDonations()
      .then(res => {
        this.setState({
          reservedItems: res.data.filter(item => (item.status === 'reserved' && item.receiverId == userId))
        });
      })
      .catch(error => { console.warn(error) });
  };

  getAllDonations = () => {
    API.getDonations()
      .then(res => {
        console.log("res", res);
        this.setState(
            {
              donations: res.data
              // tags: res.data.tags,
              // tagFacets: newTagFacets
            });
        }
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFacetCheck = event => {
    const {id} = event.target;
    console.log("handleFacetCheck: " + id);
    const newTagFacets = this.state.tagFacets.map(tagFacet => {
      if (tagFacet.key === id) {
        return Object.assign(tagFacet,{isSelected: !tagFacet.isSelected});
      }
      else {
        return tagFacet;
      }
    });
    const activeTags = newTagFacets.reduce((a,e) => {
      if (e.isSelected) {
        a.push(e.key);
      }
      return a;
    },[]);
    if (activeTags.length > 0) {

    const query={
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
  saveItem = (event) =>
  {
    let itemId = event.target.id;
    let userId = 1;//TO DO make to current logged in user
    let index = this.state.donations.findIndex(donation => donation.id == itemId);
    let donationsCopy = this.state.donations;
    let updatedReservedItems = this.state.reservedItems;

    donationsCopy[index].receiverId = userId;
    donationsCopy[index].status = 'reserved';

    updatedReservedItems.push(donationsCopy[index]);
    
    API.reserveItem(userId, itemId)
      .then(item => {
        console.log("it saved my food", item);
        this.getAllDonations();
        // this.setState({
        //   donations: donationsCopy,
        //   reservedItems: updatedReservedItems
        // })
      })
      .catch(error => console.log("there was an error", error));
  };

  removeItem = event => {
    let itemId = event.target.id;
    let donationsCopy = this.state.donations;
    let index = this.state.reservedItems.findIndex(donation => donation.id == itemId);
    let currentItem = this.state.reservedItems[index];
    currentItem.status = 'available';
    currentItem.receiverId = null;
    donationsCopy.push(currentItem);

    API.unreserveItem(itemId)
      .then(item => {
        console.log('it worked to unreserve the item');
        this.getAllDonations();
        this.getAllReservedItems();
        // this.setState({
        //   reservedItems: this.state.reservedItems.filter(currentItem => currentItem.id != itemId),
        //   donations: donationsCopy
        // });
      })
      .catch(error => console.warn('there was an error unreserving the item', error));
  }


  render = () =>
<div className= "donations">
  <div className= "jumbotron jumbotron-fluid" id="receiveJumbotron">
    <div className="container">
      <h1>Welcome</h1>
      <h2>Search for food that is available for pickup</h2>
    </div>
  </div>

  <div className="container">   
      <div className="row">

        {/*<div className="col-md-2" id="donationColumn1">
          <h5>Search Results</h5>
          <FacetGroup title="Tags" facets={this.state.tagFacets} handleFacetCheck={this.handleFacetCheck} type="multi-select"/>
            /*<FacetGroup title="Color" tree={colorFacetsTree}/>*/
            /*<FacetGroup title="Category" facets={categoryFacets} tree={categoryFacetsTree}/>
        </div>*/}
        
        <div className="col-md-5" id="donationColumn2">
          <div className= "donationCard">
            <div className= "card-body">
            {/*<h5>Search for Available Food Items</h5>
              <div className="input-group">
                <input name="search" type="text" id="searchInput" className="form-control" value={this.setState.donations}/>
                <button id="searchButton" className="btn btn-dark btn-md" type="submit">Search</button>
              </div>
            <hr />*/}
            <h5>Donation Items Available</h5>
            <hr />
            <div>
              <List>
                {
                  this.state.donations.filter(donation => donation.status === "available")
                  .map(donation =>
                    <ListItem key={donation.id}>
                      <DonationResult donation={donation}/>
                       <button id={donation.id} className="btn btn-dark btn-md" type="submit" onClick={this.saveItem}>Reserve</button>
                    </ListItem>
                  )
                } 
              </List>
            </div>
          </div>
        </div>
      </div>  
               
      <div className="col-md-6"id="donationColumn3">
        <div className= "donationCard">
          <h5>Items to Pick Up</h5>
          <hr />
            <div className= "card-body">
              <div>
                <List>
                  {
                    this.state.reservedItems.map(item =>
                      <ListItem key={item.id}>
                        <DonationResult donation={item} />
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

export default Donations;
