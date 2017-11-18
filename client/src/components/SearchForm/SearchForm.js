import React from "react";
import "./SearchForm.css";
import {Link} from "react-router-dom";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const SearchForm = props =>
  <div>
    <p>props.state: {JSON.stringify(props.state,null,2)}</p>
    <form className="search">
      <div className="form-group">
        <label htmlFor="topic">Topic</label>
        <input
          value={props.state.topic}
          onChange={props.handleInputChange}
          name="topic"
          type="text"
          className="form-control"
          placeholder="Topic"
          id="topic"/>
      </div>
      <div className="form-group">
        <label htmlFor="startYear">Start year</label>
        <input
          value={props.state.startYear}
          onChange={props.handleInputChange}
          name="startYear"
          type="year"
          className="form-control"
          placeholder="Start Year"
          id="startYear"/>
      </div>
      <div className="form-group">
        <label htmlFor="endYear">End year</label>
        <input
          value={props.state.endYear}
          onChange={props.handleInputChange}
          name="endYear"
          type="year"
          className="form-control"
          placeholder="End Year"
          id="endYear"/>
      </div>
    </form>
    <button className="btn btn-success">
      <Link style={{display: 'block', height: '100%'}}
            to={{pathname: `/results/${props.state.topic}/${props.state.startYear}/${props.state.endYear}`}}>
        Search
      </Link>
    </button>
  </div>;

export default SearchForm;
