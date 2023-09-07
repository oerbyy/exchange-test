import React from 'react';
import {Col} from 'react-bootstrap';

import CurrencyTable from './CurrencyTable';
import Converter from './Converter';


export default function MainPage() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Col xs={12} md={8} lg={8} xl={8} xxl={8}>
        <CurrencyTable />
      </Col>
      <Col xs={12} md={8} lg={8} xl={8} xxl={8}>
        <Converter />
      </Col>
    </div>
  );
}
