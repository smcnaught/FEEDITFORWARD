import React from "react";

export const FacetLabel = props =>  {
  return <span className="facet">
    <label htmlFor={props.forInput}>{props.label}</label>&nbsp;<span className="facet-count">({props.count})</span>
    </span>;
};
