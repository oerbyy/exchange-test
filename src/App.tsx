import React, {useEffect} from 'react';
// import logo from './logo.svg';
// import './App.css';
import {Container} from 'react-bootstrap';

import {API_PRIVATBANK_CURRENCIES_PROXIED} from './app/constants';
import {useAppDispatch} from './app/hooks';
import {setRates} from './reducers/commonSlice';

import CurrencyTable from './components/CurrencyTable';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await fetch(API_PRIVATBANK_CURRENCIES_PROXIED);
        const json = await response.json();
        console.log(json);
        dispatch(setRates(json));
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{minHeight: '100vh'}}
        >
          <CurrencyTable />
        </Container>
      </header>
    </div>
  );
}

export default App;
