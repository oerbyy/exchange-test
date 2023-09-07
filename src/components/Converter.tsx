import React from 'react';

import {Col, FloatingLabel, Row, Form, Button, Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';

import {useAppSelector} from '../app/hooks';
import {selectAvailableCurrencies} from '../reducers/commonSlice';

function Converter(): JSX.Element {
  const currencies = useSelector(selectAvailableCurrencies);
  console.log('currencies', currencies);

  if (!currencies) return <></>;

  return (
    <Container>
      <Row className="align-items-center">
        <Col xs={4}>
          <FloatingLabel controlId="change" label="Change" className="mb-3 w-100">
            <Form.Control type="number" placeholder="Change" />
          </FloatingLabel>
        </Col>

        <Col xs={4}>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col xs={4}>
          <Button variant="primary">
            <span>&#8592;</span>
            <span>&#8594;</span>
          </Button>
        </Col>
        <Col xs={4}>
          <FloatingLabel controlId="change" label="Change" className="mb-3 w-100">
            <Form.Control type="number" placeholder="Change" />
          </FloatingLabel>
        </Col>

        <Col xs={4}>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}

export default Converter;
