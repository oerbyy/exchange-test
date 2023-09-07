import React from 'react';
import {Col} from 'react-bootstrap';

import CurrencyTable from './CurrencyTable';
import Converter from './Converter';


export default function MainPage() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Col xs={12} md={6}>
        <CurrencyTable />
      </Col>
      <Col xs={12} md={6} lg={4}>
        <Converter />
      </Col>
    </div>
  );
}
