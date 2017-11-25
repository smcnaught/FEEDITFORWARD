import React, {Component} from "react";
import API from "../utils/API";
import {List} from "../components/List/List";
import {ListItem} from "../components/List/ListItem";
import {FacetGroup} from "../components/Facets/FacetGroup";


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
    tags: []
  };

  componentDidMount() {
    API.searchAllDonations()
      .then(res => {
          this.setState(
            {
              donations: res.data.results,
              tags: res.data.tags
            });
        }
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
  };

  render = () =>
    <div className="container-fluid">
      <div className="row">
        <div className="input-group">
          <input name="search" type="text" id="searchInput" className="form-control"/>
          <button className="btn btn-dark btn-md" type="submit">Search</button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2">
          <FacetGroup title="Tags" facets={this.state.tags} type="multi-select"/>
          <FacetGroup title="Color" tree={colorFacetsTree}/>
          <FacetGroup title="Category" facets={categoryFacets} tree={categoryFacetsTree}/>
        </div>
        <div className="col-md-10">
          <List>
            {this.state.donations.map(donation => (
              <ListItem key={donation._id}>
            <pre>
              {JSON.stringify(donation, null, 2)}
            </pre>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
}

export default Donations;
