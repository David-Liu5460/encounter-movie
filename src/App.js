import logo from './logo.svg';
import React, { useState } from 'react';
import Home from './components/home';
import Landing from './components/landing';
import userEvent from '@testing-library/user-event';
// import './App.css';

function App() {
  const [isLanding, setIsLanding] = useState(false);
  const [sharedValue, setSharedValue] = useState({});
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      { !isLanding && <Landing setIsLanding={setIsLanding} setSharedValue={setSharedValue} /> }
      { isLanding && <Home sharedValue={sharedValue} /> }
    </div>
  );
}

export default App;
