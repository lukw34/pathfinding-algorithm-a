import React from 'react';

import styles from './Cell.module.scss'

class Cell extends React.Component {
    state = {
        ancestor: null,
        moveCost: null
    }

    render() {
        const { weight, type } = this.props;
        return (
            <div className={styles.container}>{type}</div>
        )    
    }
}

export default Cell;