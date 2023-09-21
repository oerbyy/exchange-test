import React from 'react';

import {Table} from 'react-bootstrap';
import {useAppSelector} from '../app/hooks';
import EditableCell from './EditableCell';
import {ExchangeType} from '../app/enums';

import '../css/currencyTable.css';

function CurrencyTable(): JSX.Element {
  const rates: CurrencyDTO[] = useAppSelector((state) => state.counter.rates);

  function getCurrencyRows(rates: CurrencyDTO[]) {
    return rates.map((el) => {
      const currencyLabel = `${el.base_ccy}/${el.ccy}`;

      return (
        <tr key={currencyLabel}>
          <td>{currencyLabel}</td>
          <td>
            <EditableCell
              key={`${ExchangeType.Buy}-${currencyLabel}`}
              exchangeType={ExchangeType.Buy}
              rateLabel={currencyLabel}
              rateValue={el.buy}
            />
          </td>
          <td>
            <EditableCell
              key={`${ExchangeType.Sell}-${currencyLabel}`}
              exchangeType={ExchangeType.Sell}
              rateLabel={currencyLabel}
              rateValue={el.sale}
            />
          </td>
        </tr>
      );
    });
  }

  return (
    <Table className="table currency-table" bordered striped style={{maxWidth: '400px'}}>
      <thead>
        <tr>
          <th scope="col">Currency</th>
          <th scope="col">Buy</th>
          <th scope="col">Cell</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">{getCurrencyRows(rates)}</tbody>
    </Table>
  );
}

export default CurrencyTable;
