import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import {API_PRIVATBANK_CURRENCIES_PROXIED} from './app/constants';
import {useAppDispatch} from './app/hooks';
import {setRates} from './reducers/commonSlice';

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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
