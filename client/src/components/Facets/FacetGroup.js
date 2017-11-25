import React from "react";

import {FacetGroupMultiSelect} from "./FacetGroupMultiSelect";

import {FacetGroupTree} from "./FacetGroupTree";

export const FacetGroup = props => {
  var facetListing;
  switch (props.type) {
    case "multi-select":
      facetListing = <FacetGroupMultiSelect facets={props.facets}/>;
      break;
    default:
      facetListing = <FacetGroupTree facets={props.facets} tree={props.tree}/>;
      break;
  }
  return <div className="facet-group">
    <h1>{props.title}</h1>
    {facetListing}
  </div>;
};
