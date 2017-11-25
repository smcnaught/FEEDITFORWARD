import React from "react";
import {FacetLink} from "./FacetLink";

export const FacetGroupTree = props => {
  var facetNodes = [];
  var overallBuild;

  if (props.facets) {
    props.facets.forEach(function (facet) {
      facetNodes.push(<li key={facet.key}><FacetLink label={facet.key} count={facet.doc_count} path={facet.path}/></li>);
    });
  }

  overallBuild = facetNodes;

  if (props.tree) {
    props.tree.reverse();
    props.tree.forEach(function (treeNode) {
      if (treeNode.isSelected) {
        var cn = <span className="x-selected">{treeNode.key}</span>;
      } else {
        var cn = <a href={treeNode.path} className="x-undo">{treeNode.key}</a>;
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
