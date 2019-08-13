import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.scss';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import {Grid, Row, Col} from 'react-flexbox-grid';
import pricing from '../../../data/pricing';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';
import settings from '../../../data/settings';


const sendOrder = (options, tripCost, countryCode, tripId, tripName, currentValue) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options, countryCode));

  const payload = {
    ...options,
    totalCost,
    countryCode,
    tripId,
    tripName,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};


class OrderForm extends React.Component {
  onSubmit = (event) => {
    event.preventDefault();
    const {
      options,
      tripCost,
      countryCode,
      tripId,
      tripName,
      currentValue
    } = this.props;

    sendOrder(options, tripCost, countryCode, tripId, tripName, currentValue);
  }

  render() {
    const {
      options,
      tripCost,
      countryCode,
      tripId,
      tripName,
      setOrderOption,
      currentValue
    } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Row>
          {pricing.map(pricingData => (
            <Col md={4} key={pricingData.id}>
            <OrderOption currentValue={options[pricingData.id]} setOrderOption={setOrderOption} {...pricingData} />
            </Col>
          ))}
          <Col xs={12}>
            <OrderSummary tripCost={tripCost} options={options} />
            {options.currentValue}
          </Col>
          <Button>Order now!</Button>
        </Row>
      </form>
    );
  }
}


OrderForm.propTypes = {
  tripCost: PropTypes.node,
  options: PropTypes.object,
  tripData: PropTypes.object,
};

export default OrderForm;
