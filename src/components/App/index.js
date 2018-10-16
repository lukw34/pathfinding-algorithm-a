import React, { Component } from 'react';

import Playground from '../Playground';

import './App.scss';

class App extends Component {
    render() {
        return (
          <div className="App">
              <Playground row={5} column={15} />
            </div>
        );
    }
}

export default App;
