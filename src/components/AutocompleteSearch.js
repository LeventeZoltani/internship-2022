// import { Autocomplete } from "@mui/material";
import React, { Component } from "react";
import db from "./db";

class AutocompleteSearch extends Component {

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
    this.onChange=this.onChange.bind(this);
    this.onKeyDown=this.onKeyDown.bind(this);

  }

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [this.titles],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      songs: this.suggestions
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        songs: filteredSuggestions[activeSuggestion],
        showSuggestions: false,
        // userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }

  };

  getSongs = async () => {
    const response = await fetch(this.baseUrl);
    this.suggestions = await response.json();
    // console.log(data)
    const dataT=[];
    for(let i=0;i<this.suggestions.length;i++){
        //console.log(data[i].title);
        dataT[i]=this.suggestions[i].title;       
    }
    this.setState(() => ({
        'titles': dataT
    }));
}

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }
              return (
                <li className={className} key={db.songs} onClick={onClick} onChange={this.onChange}>
                  {db.songs}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }

    return (
      
      <header onChange={this.onChange} onKeyDown={this.onKeyDown} value={this.state.userInput}>


      {/* ?<h1>Internship <span className={style.secondaryColor}>React Starter</span> kit</h1> */}

      {/* <Fragment> */}
        {/* <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput} */}
          
        {/* /> */}
        {/* {db.songs} */}
        {/* titles={this.state.titles} */}
      {/* </Fragment> */}
      </header>
    );
  }
}
export default AutocompleteSearch;