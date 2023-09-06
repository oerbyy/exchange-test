import React from 'react';

import {Table} from 'react-bootstrap';
import {useAppSelector} from '../app/hooks';

function CurrencyTable(): JSX.Element {
  const rates: CurrencyDTO[] = useAppSelector((state) => state.counter.rates);

  function getCurrencyRows(rates: CurrencyDTO[]) {
    return rates.map((el) => {
      const currencyLabel = `${el.base_ccy}/${el.ccy}`;

      return (
        <tr>
          <td>{currencyLabel}</td>
          <td>{el.buy}</td>
          <td>{el.sale}</td>
        </tr>
      );
    });
  }

  return (
    <Table className="table" bordered striped style={{ maxWidth: '400px' }}>
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
