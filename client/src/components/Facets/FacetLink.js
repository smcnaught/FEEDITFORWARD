import React from "react";

export const FacetLink = props => {
  return <span className="facet">
    <a href={this.props.path}>{this.props.label}</a>&nbsp;<span className="facet-count">({this.props.count})</span>
    </span>;
};
