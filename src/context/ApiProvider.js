import PropTypes from 'prop-types';
import React, { useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import ApiContext from './ApiContext';

function ApiProvider(props) {
  const INITIAL_NUMBER_FILTER = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
  };
  const INITIAL_NAME_FILTER = {
    filterByName: { name: '' },
  };
  const { children } = props;
  const [dataPlanets, setDataPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [filterName, setFilterName] = useState(INITIAL_NAME_FILTER);
  const [filterNumber, setFilterNumber] = useState(INITIAL_NUMBER_FILTER);

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

  function filterNumberConfig({ target }) {
    setFilterNumber({ ...filterNumber, [target.name]: target.value });
  }

  function filterByNumber() {
    const { column, comparison, value } = filterNumber;
    let filtered = {};
    if (comparison === 'maior que') {
      filtered = dataPlanets.filter((planet) => Number(planet[column]) > Number(value));
    }
    if (comparison === 'menor que') {
      filtered = dataPlanets.filter((planet) => Number(planet[column]) < Number(value));
      console.log(filtered);
    }
    if (comparison === 'igual a') {
      filtered = dataPlanets.filter((planet) => Number(planet[column]) === Number(value));
      console.log(filtered);
    }
    setPlanets(filtered);
  }

  const providerValue = {
    planets,
    tableHeaders,
    filterName,
    filterNumber,
    getPlanets,
    filterByName,
    filterNumberConfig,
    filterByNumber,
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
