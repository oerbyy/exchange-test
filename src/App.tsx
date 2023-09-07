import React, {useEffect} from 'react';
// import logo from './logo.svg';
// import './App.css';
import {Container} from 'react-bootstrap';

import {API_PRIVATBANK_CURRENCIES_PROXIED} from './app/constants';
import {useAppDispatch} from './app/hooks';
import {setOriginalRates} from './reducers/commonSlice';

import CurrencyTable from './components/CurrencyTable';
import Converter from './components/Converter';
import {isFakeServerError} from './helpers/commonHelper';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isFakeServerError()) throw Error('Server errpr occurred. Better luck next 4 times ;)');

        const response = await fetch(API_PRIVATBANK_CURRENCIES_PROXIED);
        const json = await response.json();
        console.log(json);
        dispatch(setOriginalRates(json));
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{minHeight: '100vh'}}
        >
          <CurrencyTable />

          <Converter />
        </Container>
      </header>
    </div>
  );
}

export default App;
