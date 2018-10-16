import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.module.scss';

const Input = ({
  onChange, value, label, id
}) => (
  <label className={styles.label} htmlFor={id}>
    {label}
    <input type="number" id={id} name={id} value={value} onChange={onChange} step="1" />
  </label>
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  label: PropTypes.string,
  id: PropTypes.string.isRequired
};

Input.defaultProps = {
  value: 0,
  label: ''
};

export default Input;
