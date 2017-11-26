import React from "react";

export const FacetLink = props => {
  return <span className="facet">
    <a href={props.path}>{props.label}</a>&nbsp;<span className="facet-count">({props.count})</span>
    </span>;
};
