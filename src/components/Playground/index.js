import React from 'react';

import Cell from '../Cell'
import styles from './CellMap.module.scss';
import {PATH, CLOSED } from '../../constants';
import {
    initPlayground,
    getSurroundings
} from '../../utils/helper';

class Playground extends React.PureComponent {
    state = {
        playground: [[]],
        startPoint: {},
        endPoint: {},
        directMove: 10,
        disabled: false
    };

    static defaultProps = {
        row: 0
    };


    handleStart = () => {
        const {playground, startPoint, directMove} = this.state;
        const {row, column} = this.props;
        const openList = [];
        const closedList = [startPoint];
        const step = () => {
            const [point] = closedList.slice(-1);
            const candidateOpenList = getSurroundings(point.x, point.y, row, column);
            candidateOpenList.forEach(({x, y}) => {
                const el = playground[x][y];

                if (el && el.weight !== null) {
                    const move = point.move || 0;
                    const weight = el.distance + move;
                    if(el.weight === 0 || weight < el.weight) {
                        openList[`${x}_${y}`] = {
                            x,
                            y,
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

            setTimeout(() => {
                const {x: minX, y: minY, move: minMove, ancestor: minAncestor} = Object.keys(openList)
                    .map(key => openList[key])
                    .reduce((prev, curr) => {
                        if (prev.weight > curr.weight) {
                            return curr;
                        }

                        return prev;
                    }, { weight: Infinity});

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
                    move: directMove + minMove
                });
                this.setState({
                    playground: [...playground]
                });

                if (minEl.distance === 1) {
                    console.log('opt');
                    this.printPath(playground[minX][minY]);
                } else {
                    step();
                }
            }, 250);
        };

        step();
    };

    printPath(start) {
        const { playground } = this.state;
        const getAncestor = ({type, x, y, ancestor}) => {
            if(x !== undefined && y !== undefined) {
                const el = playground[x][y];
                playground[x][y] = {
                    ...el,
                    type:PATH
                };

                if(ancestor.x !== undefined) {
                    getAncestor(playground[ancestor.x][ancestor.y]);
                }
            }
        };

        getAncestor(start);

        this.setState({
            playground: [...playground]
        });
    }


    componentDidMount() {
        this.initCellMap();
    }


    initCellMap = () => {
        const {row, column = row, obstaclesCount = 5} = this.props;
        const {playground, startPoint, endPoint} = initPlayground(row, column, obstaclesCount);

        this.setState({
            playground,
            startPoint,
            endPoint
        });
    };


    render() {
        const {playground} = this.state;
        return (
            <div className={styles.container}>
                Map
                <div className={styles.map}>
                    {
                        playground.map((rowData, row) =>
                            <div key={row} className={styles.row}>
                                {rowData.map((cell, column) => (
                                    <Cell
                                        key={`${row}_${column}`}
                                        {...cell}
                                        position={{
                                            row,
                                            column
                                        }}
                                    />))}
                            </div>)

                    }
                </div>
                <div>
                    <button onClick={this.initCellMap}>Reset</button>
                    <button onClick={this.handleStart}>Start</button>
                </div>
            </div>
        )
    }
}

export default Playground;