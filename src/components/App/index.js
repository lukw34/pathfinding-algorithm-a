import React, { Component } from 'react';

import CellMap from '../CellMap'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CellMap row={5} column={10} />
      </div>
    );
  }
}

export default App;
