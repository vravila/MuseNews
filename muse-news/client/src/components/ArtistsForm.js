import ReactDOM from "react-dom";
import React, { useState, useEffect, Component } from "react";
import { Link, Redirect, matchPath } from "react-router-dom";

class ArtistsForm extends Component {
  constructor(props) {
    super(props);
    console.log("constructor");
    console.log(props);
  }

  render() {
    return (
      <form action="/redirectPages" className="multi-range-field my-5 pb-5">
        <label id="searchLabel" className="col-lg-6">
          <h3>Search Artists:</h3>
          <input
            type="text"
            id="search"
            name="search"
            defaultValue={this.props.passedInParams.searchterms}
            className="form-control form-control-lg"
          ></input>
        </label>
        <label id="sortLabel" className="col-lg-6">
          <h3>Sort By:</h3>
          <select
            className="form-control form-control-lg"
            id="sort"
            name="sort"
          >
            <option
              value="rank"
              selected={
                this.props.passedInParams.sort === "rank" ? "selected" : ""
              }
            >
              Rank
            </option>
            <option
              value="nameAsc"
              selected={
                this.props.passedInParams.sort === "nameAsc" ? "selected" : ""
              }
            >
              Name Ascending
            </option>
            <option
              value="nameDesc"
              selected={
                this.props.passedInParams.sort === "nameDesc" ? "selected" : ""
              }
            >
              Name Descending
            </option>
          </select>
        </label>
        <br></br>
        <label className="col-sm-1">
          <h3>Filters:</h3>
        </label>
        <label id="ontourLabel" className="col-md-2">
          Currently on Tour: <t></t>
          <input
            id="ontour"
            name="ontour"
            type="checkbox"
            defaultChecked={
              this.props.passedInParams.ontour === "true" ? "true" : ""
            }
          />
        </label>
        <br></br>
        <label id="playCountLabel" className="col-md-3">
          Play Count:
          <input
            type="number"
            id="minPlayCount"
            name="minPlayCount"
            min="0"
            max="100882739"
            defaultValue={this.props.passedInParams.minPlayCount}
          ></input>
          to
          <input
            type="number"
            id="maxPlayCount"
            name="maxPlayCount"
            min="0"
            max="100882739"
            defaultValue={this.props.passedInParams.maxPlayCount}
          ></input>
        </label>
        <br></br>
        <label id="listenersLabel" className="col-md-3">
          Listeners:
          <input
            type="number"
            id="minListeners"
            name="minListeners"
            min="0"
            max="1473588"
            defaultValue={this.props.passedInParams.minListeners}
          ></input>
          to
          <input
            type="number"
            id="maxListeners"
            name="maxListeners"
            min="0"
            max="1473588"
            defaultValue={this.props.passedInParams.maxListeners}
          ></input>
        </label>
        <label>
          <input
            type="hidden"
            id="source"
            name="source"
            value="artists"
            class="form-control form-control-sm"
          ></input>
        </label>
        <br></br>
        <label id="artistSubmitLabel" className="col-md-3">
          <input
            id="artistSubmit"
            type="submit"
            class="btn btn-success form-control form-control-md"
            value="Submit"
          ></input>
        </label>
      </form>
    );
  }
}

export default ArtistsForm;
