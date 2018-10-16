import React from 'react';
import PropTypes from 'prop-types';

import PlaygroundMap from '../PlaygroundMap';
import styles from './Playground.module.scss';
import { CLOSED, TIMESTAMP } from '../../constants';
import {
  initPlayground,
  getPlaygroundWithPathFrom,
  getSurroundings,
  findMinWeightElement
} from '../../utils/helper';

class Playground extends React.PureComponent {
  state = {
    playground: [[]],
    startPoint: {},
    startDisabled: true
  };

  static propTypes = {
    row: PropTypes.number,
    column: PropTypes.number,
    obstaclesCount: PropTypes.number
  };

  static defaultProps = {
    row: 0,
    column: 0,
    obstaclesCount: 0
  };

  componentDidMount() {
    this.initPlayground();
  }

  handleStart = () => {
    this.setState({
      startDisabled: true
    });
    const { playground, startPoint } = this.state;
    const { row, column } = this.props;
    const openList = [];
    const closedList = [startPoint];
    const step = () => {
      const [point] = closedList.slice(-1);
      const candidateOpenList = getSurroundings(point.x, point.y, row, column);
      candidateOpenList.forEach(({ x, y, cost }) => {
        const el = playground[x][y];

        if (el && el.weight !== null) {
          const move = point.move || 0;
          const weight = el.distance + move + cost;
          if (el.weight === 0 || weight < el.weight) {
            openList[`${x}_${y}`] = {
              x,
              y,
              cost,
              weight,
              ancestor: {
                x: point.x,
                y: point.y
              },
              move
            };
            playground[x][y] = {
              ...el,
              weight,
            };
          }
        }
      });

      this.setState({
        playground: [...playground]
      });

      this.stepTimeout = setTimeout(() => {
        const {
          x: minX, y: minY, move: minMove, ancestor: minAncestor, cost: minCost
        } = findMinWeightElement(openList);

        delete openList[`${minX}_${minY}`];

        const minEl = playground[minX][minY];
        playground[minX][minY] = {
          ...minEl,
          x: minX,
          y: minY,
          type: CLOSED,
          weight: null,
          ancestor: {
            ...minAncestor,
            move: minMove
          },
        };
        closedList.push({
          x: minX,
          y: minY,
          move: minCost + minMove
        });
        this.setState({
          playground: [...playground]
        });

        if (minEl.distance === 1) {
          this.printPath(playground[minX][minY]);
        } else {
          step();
        }
      }, TIMESTAMP);
    };

    step();
  };

  initPlayground = () => {
    const { row, column = row, obstaclesCount = 10 } = this.props;
    const { playground, startPoint } = initPlayground(row, column, obstaclesCount);

    if (this.stepTimeout) {
      clearTimeout(this.stepTimeout);
    }

    this.setState({
      playground,
      startPoint,
      startDisabled: false
    });
  };

  printPath(start) {
    const { playground } = this.state;
    this.setState({
      playground: getPlaygroundWithPathFrom(playground, start)
    });
  }


  render() {
    const { playground, startDisabled } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.buttons}>
          <button type="submit" onClick={this.initPlayground}>Reset</button>
          <button disabled={startDisabled} type="submit" onClick={this.handleStart}>Start</button>
        </div>
        <PlaygroundMap playground={playground} />
      </div>
    );
  }
}

export default Playground;