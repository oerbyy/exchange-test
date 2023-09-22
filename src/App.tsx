import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';

import {API_PRIVATBANK_CURRENCIES_PROXIED} from './app/constants';
import {useAppDispatch} from './app/hooks';
import {setOriginalRates} from './reducers/commonSlice';

import {isFakeServerError} from './helpers/commonHelper';
import MainPage from './components/MainPage';
import withErrorHandling from './hocs/withErrorHandling';
import ErrorCard from './components/ErrorCard';

function App() {
  const [error, setError] = useState<Error>(Error());
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isFakeServerError()) throw Error('Server error occurred. Better luck next 4 times ;)');

        const response = await fetch(API_PRIVATBANK_CURRENCIES_PROXIED);
        const json = await response.json();
        dispatch(setOriginalRates(json));
      } catch (e) {
        const errMsg = e instanceof Error ? e.message : 'Unexpected error';

        setError(Error(errMsg));
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MainPageWithErrorHandling = withErrorHandling(MainPage, ErrorCard);

  return (
    <div className="d-flex flex-column min-vh-100" style={{minWidth: 300}}>
      <header
        className="d-flex justify-content-center align-items-center bg-gradient bg-warning text-white"
        style={{height: '100px'}}
      >
        <h1 className="display-4">Oerbyy's Exchange Calculator</h1>
      </header>

      <Container className="d-flex flex-column flex-grow-1 justify-content-center align-items-center mt-4">
        <MainPageWithErrorHandling error={error.message} />
      </Container>

      <footer
        className="bg-light d-flex justify-content-center align-items-center"
        style={{height: '100px'}}
      >
        <small className="text-muted">Volodymyr Shchukin, copyright 2023 (c)</small>
      </footer>
    </div>
  );
}

export default App;
