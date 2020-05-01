import React, { Component } from "react";

class SongsForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form
        action="/redirectSongsPages"
        className="multi-range-field my-5 pb-5"
      >
        <label id="searchLabel" className="col-lg-6">
          <h3>Search Songs:</h3>
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
              Song Title Ascending
            </option>
            <option
              value="nameDesc"
              selected={
                this.props.passedInParams.sort === "nameDesc" ? "selected" : ""
              }
            >
              Song Title Descending
            </option>
          </select>
        </label>
        <br></br>
        <label className="col-sm-1">
          <h3>Filters:</h3>
        </label>
        <label id="artistSearchLabel" className="col-md-2">
          Artists:
          <input
            type="text"
            id="artistSearch"
            name="artistSearch"
            defaultValue={this.props.passedInParams.artistSearch}
          ></input>
        </label>
        <label id="playCountLabel" className="col-md-2">
          Play Count:
          <input
            type="number"
            id="minPlayCount"
            name="minPlayCount"
            min="0"
            max="25598881"
            defaultValue={this.props.passedInParams.minPlayCount}
          ></input>
          to
          <input
            type="number"
            id="maxPlayCount"
            name="maxPlayCount"
            min="0"
            max="25598881"
            defaultValue={this.props.passedInParams.maxPlayCount}
          ></input>
        </label>
        <label id="listenersLabel" className="col-md-2">
          Listeners:
          <input
            type="number"
            id="minListeners"
            name="minListeners"
            min="0"
            max="2144166"
            defaultValue={this.props.passedInParams.minListeners}
          ></input>
          to
          <input
            type="number"
            id="maxListeners"
            name="maxListeners"
            min="0"
            max="2144166"
            defaultValue={this.props.passedInParams.maxListeners}
          ></input>
        </label>
        <br></br>
        <label id="rankLabel" className="col-md-2">
          Rank:
          <input
            type="number"
            id="minRank"
            name="minRank"
            min="1"
            max="300"
            defaultValue={this.props.passedInParams.minRank}
          ></input>
          to
          <input
            type="number"
            id="maxRank"
            name="maxRank"
            min="1"
            max="300"
            defaultValue={this.props.passedInParams.maxRank}
          ></input>
        </label>
        <label>
          <input
            type="hidden"
            id="source"
            name="source"
            value="songs"
            class="form-control form-control-sm"
          ></input>
        </label>
        <label id="songSubmitLabel" className="col-md-3">
          <input
            id="songSubmit"
            type="submit"
            class="btn btn-success form-control form-control-md"
            value="Submit"
          ></input>
        </label>
      </form>
    );
  }
}

export default SongsForm;
