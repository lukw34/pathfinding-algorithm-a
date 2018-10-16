import React from 'react';
import PropTypes from 'prop-types';

import Cell from '../Cell';

import styles from './PlaygroundMap.module.scss';

const PlaygroundMap = ({ playground }) => (
  <div className={styles.container}>
    {
      playground.map((rowData, row) => (
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
        </div>
      ))
    }
  </div>
);

PlaygroundMap.propTypes = {
  playground: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired
};

export default PlaygroundMap;