import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionNumber = ({id, name, type, price, limits, currentValue, setOptionValue}) => (
  <div className={styles.number}>
    <input
      type='number'
      className={styles.inputSmall}
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={event => setOptionValue(event.currentTarget.value)}
      />
  </div>
);

export default OrderOptionNumber;
