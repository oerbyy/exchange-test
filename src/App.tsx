import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
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
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <MainPageWithErrorHandling error={error.message} />
    </Container>
  );
}

export default App;
