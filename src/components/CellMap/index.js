import React from 'react';

import Cell from '../Cell'
import styles from './CellMap.module.scss';


class CellMap extends React.Component {
    state = {
        cellMap: [[]]
    };

    static defaultProps = {
        row: 0
    }

    static getDerivedStateFromProps({ row, column = row, obstaclesCount = 4 }) {
        const rowArr = CellMap.generateFillZeroArray(row);
        const collArr = CellMap.generateFillZeroArray(column);
        const cellMap = rowArr.map(() => [...collArr]);

        for (let i = 0; i < obstaclesCount; i++) {
            const { row: obstaclesRow, column: obstaclesColumn } = CellMap.getRandomPosition(row, column);
            cellMap[obstaclesRow][obstaclesColumn] = 1;
        }

        const { row: startRow, column: startColumn } = CellMap.getRandomPosition(row, column);
        cellMap[startRow][startColumn] = 2;

        return {
            cellMap
        }
    }

    static getRandomPosition = (row, column) => {
        const randomColumn = Math.floor(Math.random() * column);
        const randomRow = Math.floor(Math.random() * row);
        return {
            row: randomRow,
            column: randomColumn
        }
    }

    static generateFillZeroArray = size => Array.from(new Array(size), () => 0);

    render() {
        const { cellMap } = this.state;
        return(
            <div className={styles.container} >
                Map
                <div className={styles.map}>
                    {
                        cellMap.map((rowData, row) => 
                        <div key={row} className={styles.row}>
                            {rowData.map((cell, column) => (
                                <Cell
                                    key={`${row}_${column}`} 
                                    type={cell} 
                                    position={{
                                        row,
                                        column
                                    }} 
                                />))}
                        </div>)

                    }
                </div>
            </div>
        )
    }
}

export default CellMap;