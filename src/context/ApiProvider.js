import PropTypes from 'prop-types';
import React, { useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import ApiContext from './ApiContext';

function ApiProvider(props) {
  const { children } = props;
  const [dataPlanets, setDataPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [filterName, setFilterName] = useState({ filterByName: { name: '' } });

  async function getPlanets() {
    const { results } = await fetchPlanets();
    results.map((planet) => delete planet.residents);
    setDataPlanets(results);
    setPlanets(results);
    setTableHeaders(Object.keys(results[0]));
  }

  function filterPlanets(name) {
    const filtered = dataPlanets.filter((planet) => planet.name.includes(name));
    setPlanets(filtered);
  }

  function filterByName({ target }) {
    setFilterName({ filterByName: { name: target.value } });
    filterPlanets(target.value);
  }

  const providerValue = {
    planets,
    tableHeaders,
    getPlanets,
    filterByName,
    filterName,
  };

  return (
    <ApiContext.Provider value={ providerValue }>
      {children}
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiProvider;
