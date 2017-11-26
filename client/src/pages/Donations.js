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
          <FacetGroup title="Tags" facets={this.state.tagFacets} handleFacetCheck={this.handleFacetCheck} type="multi-select"/>
          {/*<FacetGroup title="Color" tree={colorFacetsTree}/>*/}
          {/*<FacetGroup title="Category" facets={categoryFacets} tree={categoryFacetsTree}/>*/}
        </div>
        <div className="col-md-10">
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
      </div>
    </div>
}

export default Donations;
