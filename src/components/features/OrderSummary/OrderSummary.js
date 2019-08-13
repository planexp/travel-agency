import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.scss';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';

const OrderSummary = props => (
  <h2 className={styles.component}>
    Total: <strong>{formatPrice(calculateTotal(props.tripCost, props.options))}</strong>
  </h2>
);

OrderSummary.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
};

export default OrderSummary;
