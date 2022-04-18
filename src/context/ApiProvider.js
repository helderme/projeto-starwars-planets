import React, { useState } from 'react';
import ApiContext from './ApiContext';
import { fetchPlanets } from '../services/fetchPlanets';

function ApiProvider(props) {
  const [planets, setPlanets] = useState();

  function getPlanets() {
    setPlanets([fetchPlanets()]);
  }

  return (
    <ApiContext.Provider value={ { teste: 'olá' } }>
      {props.children}
    </ApiContext.Provider>
  );
}

export default ApiProvider;
