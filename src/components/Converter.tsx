import React, {useEffect, ChangeEvent, FormEvent} from 'react';

import {Col, FloatingLabel, Row, Form, Button, Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';

import {useAppSelector, useAppDispatch} from '../app/hooks';
import {selectAvailableCurrencies, updateCurrency, updateAmount} from '../reducers/commonSlice';
import {ExchangeType} from '../app/enums';

function Converter(): JSX.Element {
  const currencies: string[] = useSelector(selectAvailableCurrencies);

  const sellCurrency: string = useAppSelector((state) => state.counter.sellCurrency);
  const buyCurrency: string = useAppSelector((state) => state.counter.buyCurrency);
  const sellAmount: number = useAppSelector((state) => state.counter.sellAmount);
  const buyAmount: number = useAppSelector((state) => state.counter.buyAmount);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currencies.length > 0) {
      dispatch(updateCurrency({currency: currencies[0], exchangeType: ExchangeType.Sell}));
      dispatch(updateCurrency({currency: currencies[0], exchangeType: ExchangeType.Buy}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencies]);

  if (!currencies) return <>No currencies available</>;

  const onChangeSellCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateCurrency({currency: e.target.value, exchangeType: ExchangeType.Sell}));
  };

  const onChangeBuyCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateCurrency({currency: e.target.value, exchangeType: ExchangeType.Buy}));
  };

  const onSwapCurrencies = () => {
    dispatch(updateCurrency({currency: sellCurrency, exchangeType: ExchangeType.Buy}));
    dispatch(updateCurrency({currency: buyCurrency, exchangeType: ExchangeType.Sell}));
  };

  const onChangeSellAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (sellCurrency === buyCurrency) {
      dispatch(updateAmount({sellAmount: value, buyAmount: value}));
    }
  };

  const onChangeBuyAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (sellCurrency === buyCurrency) {
      dispatch(updateAmount({sellAmount: value, buyAmount: value}));
    }
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col xs={4}>
          <FloatingLabel controlId="change" label="Change" className="mb-3 w-100">
            <Form.Control
              onChange={onChangeSellAmount}
              value={sellAmount}
              type="number"
              placeholder="Change"
            />
          </FloatingLabel>
        </Col>

        <Col xs={4}>
          <Form.Label>Sell:</Form.Label>
          <Form.Select
            onChange={onChangeSellCurrency}
            value={sellCurrency}
            aria-label="Sell currency"
          >
            {currencies.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={4}>
          <Button onClick={onSwapCurrencies} variant="primary">
            <span>&#8592;</span>
            <span>&#8594;</span>
          </Button>
        </Col>

        <Col xs={4}>
          <FloatingLabel controlId="change" label="Get" className="mb-3 w-100">
            <Form.Control
              onChange={onChangeBuyAmount}
              value={buyAmount}
              type="number"
              placeholder="Get"
            />
          </FloatingLabel>
        </Col>

        <Col xs={4}>
          <Form.Label>Buy:</Form.Label>
          <Form.Select onChange={onChangeBuyCurrency} value={buyCurrency} aria-label="Buy currency">
            {currencies.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}

export default Converter;
