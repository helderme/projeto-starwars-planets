import React from 'react';
import './App.css';
import ApiProvider from './context/ApiProvider';

function App() {
  return (
    <>
      <ApiProvider>
        <div>Olá</div>
      </ApiProvider>
    </>
  );
}

export default App;
