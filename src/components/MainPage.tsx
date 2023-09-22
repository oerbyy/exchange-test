import React from 'react';
import {Col, Row} from 'react-bootstrap';

import CurrencyTable from './CurrencyTable';
import Converter from './Converter';

export default function MainPage() {
  return (
    <>
      <Row>
        <Col>
          <CurrencyTable />
        </Col>
      </Row>
      <Row>
        <Col>
          <Converter />
        </Col>
      </Row>
    </>
  );
}
