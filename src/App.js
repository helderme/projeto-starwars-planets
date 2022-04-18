import React from 'react';
import './App.css';
import ApiProvider from './context/ApiProvider';
import Planets from './Pages/Planets';

function App() {
  return (
    <ApiProvider>
      <Planets />
    </ApiProvider>
  );
}

export default App;
