import React, {useEffect, ChangeEvent, FormEvent} from 'react';

import {Col, FloatingLabel, Row, Form, Button, Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';

import {useAppSelector, useAppDispatch} from '../app/hooks';
import {
  selectAvailableCurrencies,
  updateCurrency,
  swapCurrencies,
  updateAmount,
  selectSellToBuyRates,
  selectConvertAvailability,
} from '../reducers/commonSlice';
import {ExchangeType} from '../app/enums';
import {getBuyAmount, getSellAmount} from '../helpers/calculationsHelper';

function Converter(): JSX.Element {
  const allCurrencies: string[] = useSelector(selectAvailableCurrencies);
  const sellToBuyRates = useSelector(selectSellToBuyRates);
  console.log('sellToBuyRates', sellToBuyRates);
  const convertAvailability = useSelector(selectConvertAvailability);
  console.log('convertAvailability', convertAvailability);

  const sellCurrency: string = useAppSelector((state) => state.counter.sellCurrency);
  const buyCurrency: string = useAppSelector((state) => state.counter.buyCurrency);
  const sellAmount: number = useAppSelector((state) => state.counter.sellAmount);
  const buyAmount: number = useAppSelector((state) => state.counter.buyAmount);
  const currentRate: CurrencyDTO = sellToBuyRates[`${sellCurrency}/${buyCurrency}`];

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allCurrencies.length > 0 && Object.keys(convertAvailability).length > 0) {
      const defaultSellCurrency = allCurrencies[0];
      dispatch(updateCurrency({currency: defaultSellCurrency, exchangeType: ExchangeType.Sell}));
      dispatch(
        updateCurrency({
          currency: convertAvailability[defaultSellCurrency][0],
          exchangeType: ExchangeType.Buy,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCurrencies]);

  if (!allCurrencies || allCurrencies.length < 2)
    return <>Sorry, not enough currencies for exchange</>;

  const onChangeSellCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSellCurrency = e.target.value;
    dispatch(updateCurrency({currency: newSellCurrency, exchangeType: ExchangeType.Sell}));

    if (!convertAvailability[newSellCurrency].includes(buyCurrency)) {
      dispatch(
        updateCurrency({
          currency: convertAvailability[newSellCurrency][0],
          exchangeType: ExchangeType.Buy,
        })
      );
    }
  };

  const onChangeBuyCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    const newBuyCurrency = e.target.value;
    dispatch(updateCurrency({currency: newBuyCurrency, exchangeType: ExchangeType.Buy}));

    if (!convertAvailability[newBuyCurrency].includes(sellCurrency)) {
      dispatch(
        updateCurrency({
          currency: convertAvailability[newBuyCurrency][0],
          exchangeType: ExchangeType.Sell,
        })
      );
    }
  };

  const onSwapCurrencies = () => {
    const newSellAmount = buyAmount;
    const newSellRate = currentRate.buy;
    const newBuyAmount = getSellAmount(newSellAmount, newSellRate);

    dispatch(swapCurrencies({sellCurrency, buyCurrency}));
    dispatch(updateAmount({sellAmount: newSellAmount, buyAmount: newBuyAmount}));
  };

  const onChangeSellAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const sellAmount = Number(e.target.value);
    const buyAmount = getBuyAmount(sellAmount, currentRate.sale);

    dispatch(updateAmount({sellAmount, buyAmount}));
  };

  const onChangeBuyAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const buyAmount = Number(e.target.value);
    const sellAmount = getSellAmount(buyAmount, currentRate.sale);

    dispatch(updateAmount({sellAmount, buyAmount}));
  };

  const buyCurrencies = convertAvailability[sellCurrency] || [];

  return (
    <Container>
      <Row className="align-items-center">
        <Col xs={4}>
          <FloatingLabel controlId="change" label="Change" className="mb-3 w-100">
            <Form.Control
              onChange={onChangeSellAmount}
              value={sellAmount}
              type="number"
              min={0}
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
            {allCurrencies.map((el) => (
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
              min={0}
              placeholder="Get"
            />
          </FloatingLabel>
        </Col>

        <Col xs={4}>
          <Form.Label>Buy:</Form.Label>
          <Form.Select onChange={onChangeBuyCurrency} value={buyCurrency} aria-label="Buy currency">
            {buyCurrencies.map((el) => (
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
