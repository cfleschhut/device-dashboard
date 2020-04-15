import React, { Component } from 'react';
import './search.css';

class Search extends Component {
  state = {
    inputValue: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState(() => ({
      inputValue: value,
    }));

    this.props.onSearch(value);
  };

  render() {
    const { inputValue } = this.state;

    return (
      <div>
        <input
          type="search"
          className="search-field"
          placeholder="Search readings…"
          value={inputValue}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Search;
