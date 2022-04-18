import PropTypes from 'prop-types';
import React, { useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import ApiContext from './ApiContext';

function ApiProvider(props) {
  const { children } = props;
  const [planets, setPlanets] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  async function getPlanets() {
    const { results } = await fetchPlanets();
    results.map((planet) => delete planet.residents);
    setPlanets(results);
    setTableHeaders(Object.keys(results[0]));
  }

  return (
    <ApiContext.Provider value={ { planets, tableHeaders, getPlanets } }>
      {children}
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiProvider;
