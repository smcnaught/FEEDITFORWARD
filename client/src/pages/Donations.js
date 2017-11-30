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
    tags: [],
    tagFacets: []
    
  };

  componentDidMount() {
    API.searchAllDonations()
      .then(res => {
        const currentFacetMap = this.state.tagFacets.reduce((a,e) => a[e.key]=e,{});
        const tags = res.data.tags;
        const newTagFacets = tags.map(tagFacet => {
          const currentFacet = currentFacetMap[tagFacet.key];
          return currentFacet || Object.assign(tagFacet,{isSelected: false});
        });

        this.setState(
            {
              donations: res.data.results,
              tags: res.data.tags,
              tagFacets: newTagFacets
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

  render = () =>
<div className= "donations">
  <div className= "jumbotron jumbotron-fluid" id="receiveJumbotron">
    <div className="container">
      <h1>Welcome</h1>
      <h2>Search for food that is available for pickup</h2>
    </div>
  </div>

  <div className="container-fluid">   
    <div className="row">

      <div className="col-md-2" id="column1">
        <h5>Search Results</h5>
        <FacetGroup title="Tags" facets={this.state.tagFacets} handleFacetCheck={this.handleFacetCheck} type="multi-select"/>
          {/*<FacetGroup title="Color" tree={colorFacetsTree}/>*/}
          {/*<FacetGroup title="Category" facets={categoryFacets} tree={categoryFacetsTree}/>*/}

        <List>
          {
            this.state.donations.map(donation =>
              <ListItem>
                <DonationResult donation={donation}/>
              </ListItem>
            )
          }
        </List>
      </div>

      <div className="col-md-5" id="column2">
        <h5>Search for Available Food Items</h5>
          <div className="input-group">
            <input name="search" type="text" id="searchInput" className="form-control"/>
            <button id="searchButton" className="btn btn-dark btn-md" type="submit">Search</button>
          </div>
        <hr />
        <h5>Donation Items Available</h5>
        <div>
          <input name="donation" type="text" id="donationAvailable" placeholder="donation available" className="form-control" />
          <div id="checkbox">
            <input name="checkbox" type="checkbox" id="checkbox" />
            <label for="checkbox">Check to Select</label>
            <button id="reserveButton" className="btn btn-dark btn-md" type="submit">Reserve</button>
          </div>   
        </div>
      </div>
             
      <div className="col-md-4"id="column3">
        <h5>Items to Pick Up</h5>
          <div> 
            <input name="pick-up" type="text" id="pick-up" placeholder="pick-up" className="form-control" />
            <div id="checkbox">
              <input name="checkbox" type="checkbox" />
              <label for="checkbox">Check to Remove</label>                   
              <button id="removeButton" className="btn btn-dark btn-md" type="submit">Remove</button>
            </div>
            <hr />
            <button className="btn btn-dark btn-md" type="submit">Select For Pickup</button>
          </div>
      </div>
               
    </div>
  </div>
</div>

}

export default Donations;
