var brandFacets = [
  {
    "label": "Healthcare Equipment",
    "path": "/catalog/healthcare-equipment",
    "count": 45
  },
  {
    "label": "Foodservice",
    "path": "/catalog/foodservice",
    "count": 12
  },
  {
    "label": "Rehabilitation",
    "path": "/catalog/rehabilitation",
    "count": 8
  }
];
var colorFacetsTree = [
  {
    "label": "Any Color",
    "path": "/catalog/",
    "isSelected": false
  },
  {
    "label": "Puce",
    "path": "/catalog/",
    "isSelected": true
  }
];
var categoryFacets = [
  {
    "label": "Grabs Bars",
    "path": "/catalog/healthcare-equipment-bathing-grab-bars",
    "count": 45
  },
  {
    "label": "Tub Accessories",
    "path": "/catalog/healthcare-equipment-bathing-tub-accessories",
    "count": 12
  },
  {
    "label": "Bathing Lifts",
    "path": "/catalog/healthcare-equipment-bathing-bathing-lifts",
    "count": 8
  }
];
var categoryFacetsTree = [
  {
    "label": "Any Category",
    "path": "/catalog/",
    "isSelected": false
  },{
    "label": "Healthcare Equipment",
    "path": "/catalog/healthcare-equipment",
    "isSelected": false
  },
  {
    "label": "Bathing",
    "path": "/catalog/healthcare-equipment-bathing",
    "isSelected": true
  }
];
var attributeFacets = [
  {
    "label": "Free Shipping",
    "path": "/catalog/?freeshipping=1",
    "count": 45
  },
  {
    "label": "Previously Purchased",
    "path": "/catalog/?prevpurch=1",
    "count": 12,
    "isSelected": true
  },
  {
    "label": "Preferred",
    "path": "/catalog/?pref=1",
    "count": 8
  }
];
var weightFacets = [
  {
    "label": "175 to 300 lbs",
    "count": 19,
    "path": "/Search?weight=175-300"
  }, {
    "label": "450 to 850 lbs",
    "count": 14,
    "path": "/Search?weight=450-850"
  },{
    "label": "875 to 1,100 lbs",
    "count": 12,
    "path": "/Search?weight=875-1000"
  }];
var heightFacets = [
  {
    "label": "23 in",
    "count": 19,
    "path": "/Search?height=23"
  }, {
    "label": "35 in",
    "count": 14,
    "path": "/Search?weight=14"
  },{
    "label": "45 in",
    "count": 12,
    "path": "/Search?weight=45"
  }];
var heightFacetsTree = [
  {
    "label": "Any Height",
    "path": "/catalog/",
    "isSelected": false
  },
  {
    "label": "20 to 50 in",
    "path": "/catalog/",
    "isSelected": true
  }
];

var FacetLink = React.createClass({
  render: function(){
    return <span className="facet">
      <a href={this.props.path}>{this.props.label}</a>&nbsp;<span className="facet-count">({this.props.count})</span>
      </span>;
  }
});
var FacetLabel = React.createClass({
  render: function(){
    return <span className="facet">
      <label htmlFor={this.props.forInput}>{this.props.label}</label>&nbsp;<span className="facet-count">({this.props.count})</span>
      </span>;
  }
});
var FacetGroup = React.createClass({
  render: function(){
    var facetListing;
    switch(this.props.type) {
    case "multi-select":
      facetListing = <FacetGroupMultiSelect facets={this.props.facets} />;
      break;
    default:
      facetListing = <FacetGroupTree facets={this.props.facets} tree={this.props.tree} />;
      break;
    }
    return <div className="facet-group">
      <h1>{this.props.title}</h1>
      {facetListing}
    </div>
  }
});

var FacetGroupTree = React.createClass({
  render: function(){

    var facetNodes = [];
    var overallBuild;

    if( this.props.facets ) {
      this.props.facets.forEach(function(facet) {
        facetNodes.push(<li><FacetLink label={facet.label} count={facet.count} path={facet.path} /></li>);
      });
    }

    overallBuild = facetNodes;

    if( this.props.tree ) {
      this.props.tree.reverse();
      this.props.tree.forEach(function(treeNode) {
        if( treeNode.isSelected ) {
          var cn = <span className="x-selected">{treeNode.label}</span>;
        } else {
          var cn = <a href={treeNode.path} className="x-undo">{treeNode.label}</a>;
        }
        overallBuild = <li>{cn}
          <ul>
          {overallBuild}
        </ul>
          </li>;
      });
    }

    return <ul>{overallBuild}</ul>;
  }
});
var FacetGroupMultiSelect = React.createClass({
  render: function(){
    var rows = [],
        checked = '',
        name;
    this.props.facets.forEach(function(facet) {
      if( facet.isSelected ) { checked = 'checked' }
      name = facet.label.replace(/[^\w+]/, "-");
      rows.push(<li><input type='checkbox' checked={checked} id={name}/> <FacetLabel forInput={name} label={facet.label} count={facet.count} path={facet.path} /></li>);
      checked = '';
    });
    return <ul>{rows}</ul>;
  }
});

React.render(
    <span>
    <FacetGroup title="Brands" facets={brandFacets}  />
    <FacetGroup title="Color" tree={colorFacetsTree}/>
    <FacetGroup title="Category" facets={categoryFacets} tree={categoryFacetsTree}/>
    <FacetGroup title="Attributes" facets={attributeFacets} type="multi-select" />
    <FacetGroup title="Weight" facets={weightFacets} />
    <FacetGroup title="Height" facets={heightFacets} tree={heightFacetsTree} />
    </span>,
  document.getElementById('search-facets')
);
