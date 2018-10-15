import React from 'react';

import styles from './Cell.module.scss'
import { PATH } from '../../constants';

class Cell extends React.Component {

    render() {
        const { type, distance, weight } = this.props;
        return (
            <div className={`${styles.container} ${styles[type]}`}>
                {
                    type !== PATH && <span className={styles.distance}>{distance}</span>
                }
                <span className={styles.weight}>{weight}</span>

            </div>
        )    
    }
}

export default Cell;