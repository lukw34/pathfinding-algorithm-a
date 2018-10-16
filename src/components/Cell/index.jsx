import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

import styles from './Cell.module.scss';
import { PATH } from '../../constants';

const Cell = ({ type, distance, weight }) => (
  <div className={`${styles.container} ${styles[type]}`}>
    {
      type !== PATH && <span className={styles.distance}>{distance}</span>
    }
    <span className={styles.weight}>{ weight !== 0 && weight }</span>

  </div>
);


Cell.propTypes = {
  type: PropTypes.string.isRequired,
  distance: PropTypes.number,
  weight: PropTypes.number
};

Cell.defaultProps = {
  distance: null,
  weight: null
};

export default pure(Cell);