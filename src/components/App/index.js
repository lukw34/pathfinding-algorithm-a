import React, { Component } from 'react';

import CellMap from '../Playground'

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CellMap row={5} column={15} />
      </div>
    );
  }
}

export default App;
