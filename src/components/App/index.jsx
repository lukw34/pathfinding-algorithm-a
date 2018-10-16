import React, { Component } from 'react';

import Playground from '../Playground';
import Input from '../Input';
import styles from './App.module.scss';

class App extends Component {
  state = {
    row: 5,
    column: 15,
    obstaclesCount: 5
  };

  constructor(props) {
    super(props);
    this.changeRowValue = this.changeModelValue.bind(this, 'row');
    this.changeColumnValue = this.changeModelValue.bind(this, 'column');
    this.changeObstacleCountValue = this.changeModelValue.bind(this, 'obstaclesCount');
  }

  changeModelValue = (key, e) => {
    this.setState({
      [key]: Number(e.target.value)
    });
  };

  render() {
    const { column, row, obstaclesCount } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.inputs}>
          <Input onChange={this.changeColumnValue} id="column" label="Number of columns" value={column} />
          <Input onChange={this.changeRowValue} id="row" label="Number of rows" value={row} />
          <Input onChange={this.changeObstacleCountValue} id="obstaclesCount" label="Number of obstacles" value={obstaclesCount} />
        </div>
        <div className={styles.playground}>
          <Playground {...this.state} />
        </div>
      </div>
    );
  }
}

export default App;
