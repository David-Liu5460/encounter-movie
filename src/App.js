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
      { !isLanding && <Landing setIsLanding={setIsLanding} setSharedValue={setSharedValue} /> }
      { isLanding && <Home sharedValue={sharedValue} /> }
    </div>
  );
}

export default App;
