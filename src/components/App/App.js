import React, { Component } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import './app.css';

class App extends Component {
  state = {
    readings: [],
    updatingName: null,
    updatingError: false,
    searchText: '',
  };

  componentDidMount() {
    this.fetchReadings();
  }

  fetchReadings() {
    const url = 'http://localhost:8888/devices';
    fetch(url)
      .then((res) => res.json())
      .then(({ data: readings }) => {
        this.setState(() => ({ readings }));
      });
  }

  handleStatusBtnClick = (readingName, readingStatus) => {
    this.updateReadingStatus(readingName, readingStatus);
  };

  updateReadingStatus(readingName, status) {
    const url = `http://localhost:8888/devices/${readingName}?active=${status}`;
    const readingIndex = this.state.readings.findIndex(
      (reading) => reading.name === readingName
    );

    this.setState(() => ({
      updatingName: readingName,
      updatingError: false,
    }));

    fetch(url, {
      method: 'PATCH',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'OK') {
          this.setState(() => ({ updatingError: true }));
          return false;
        }

        this.setState((state) => {
          return {
            readings: [
              ...state.readings.slice(0, readingIndex),
              {
                ...state.readings[readingIndex],
                active: status,
              },
              ...state.readings.slice(readingIndex + 1),
            ],
            updatingName: null,
            updatingError: false,
          };
        });
      });
  }

  handleSearch = (searchValue) => {
    this.setState(() => ({
      searchText: searchValue,
    }));
  };

  render() {
    const { readings, updatingName, updatingError, searchText } = this.state;
    const filteredReadings = readings.filter((reading) =>
      reading.name.match(searchText)
    );

    return (
      <article className="app">
        <Header onSearch={this.handleSearch} />
        <Main
          readings={filteredReadings}
          readingUpdatingName={updatingName}
          readingUpdatingError={updatingError}
          onBtnClick={this.handleStatusBtnClick}
        />
      </article>
    );
  }
}

export default App;
