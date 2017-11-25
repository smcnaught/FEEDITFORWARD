import React from "react";
import {FacetLink} from "./FacetLink";

export const FacetGroupTree = props => {
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
};
