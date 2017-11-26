import React from "react";

import {FacetLabel} from "./FacetLabel";

export const FacetGroupMultiSelect = props => {
  var rows = [],
    checked = '',
    name;
  props.facets.forEach(function (facet) {
    if (facet.isSelected) {
      checked = 'checked'
    }
    name = facet.key.replace(/[^\w+]/, "-");
    rows.push(
      <li key={name}>
        <input type='checkbox' checked={checked} id={name} onClick={props.handleFacetCheck}/>

        <FacetLabel forInput={name}
                    label={facet.key}
                    count={facet.doc_count}
                    path={facet.path}/></li>);
    checked = '';
  });
  return <ul>{rows}</ul>;
};
