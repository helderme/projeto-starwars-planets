import PropTypes from 'prop-types';
import React, { useState } from 'react';
import fetchPlanets from '../services/fetchPlanets';
import ApiContext from './ApiContext';

function ApiProvider(props) {
  const INITIAL_FILTER_CONFIG = {
    column: 'population',
    comparison: 'maior que',
    value: '0',
    index: 0,
  };

  const INITIAL_NAME_FILTER = {
    filterByName: { name: '' },
  };

  const INITIAL_COLUMNS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const { children } = props;
  const [dataPlanets, setDataPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [filterName, setFilterName] = useState(INITIAL_NAME_FILTER);
  const [filterConfig, setFilterConfig] = useState(INITIAL_FILTER_CONFIG);
  const [filterNumber, setFilterNumber] = useState([]);
  const [orderConfigPlanets, setOrderNumber] = useState([]);
  const [orderPlanets, setOrder] = useState([]);
  const [columns, setColumns] = useState(INITIAL_COLUMNS);

  function compare(a, b) {
    const negative = -1;
    if (a.name < b.name) { return negative; }
    if (a.name > b.name) { return 1; }
    return 0;
  }

  async function getPlanets() {
    const { results } = await fetchPlanets();
    results.map((planet) => delete planet.residents);
    results.sort(compare);
    console.log(results);
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
    setFilterConfig({ ...filterConfig, [target.name]: target.value });
  }

  function deleteFilter(index) {
    const filtered = filterNumber.filter((filter) => filter.index !== index);
    setFilterNumber(filtered);
  }

  function addFilter() {
    const last = filterNumber[filterNumber.length - 1];
    const newIndex = last ? last.index + 1 : 0;
    setFilterNumber([...filterNumber, { ...filterConfig, index: newIndex }]);
  }

  function enabledColumns() {
    const enabled = INITIAL_COLUMNS
      .filter((column) => filterNumber.every((filter) => filter.column !== column));
    setColumns(enabled);
  }

  function checkFilterPlanet(planet) {
    const check = [];
    filterNumber.forEach((filter) => {
      const { column, comparison, value } = filter;
      if (comparison === 'maior que') {
        check.push(Number(planet[column]) > Number(value));
      }
      if (comparison === 'menor que') {
        check.push(Number(planet[column]) < Number(value));
      }
      if (comparison === 'igual a') {
        check.push(Number(planet[column]) === Number(value));
      }
    });
    return check.every((item) => item === true);
  }

  function filterByNumber() {
    const filtered = dataPlanets.filter((planet) => checkFilterPlanet(planet));
    setPlanets(filtered);
  }

  function orderConfig({ target }) {
    const value = target.type === 'radio' ? target.id : target.value;
    setOrderNumber({ ...orderConfigPlanets, [target.name]: value });
  }

  function organizerASC(planetA, planetB) {
    const negative = -1;
    if (planetA === 'unknown') { return 1; }
    if (planetB === 'unknown') { return negative; }
    return (planetA - planetB);
  }

  function organizerDESC(planetA, planetB) {
    const negative = -1;
    if (planetB === 'unknown') { return negative; }
    return (planetB - planetA);
  }

  function orderByNumber() {
    const { sort } = orderConfigPlanets;
    const column = orderConfigPlanets.order;
    const newDataPlanets = [...dataPlanets];
    const ordened = newDataPlanets
      .sort((planetA, planetB) => (
        sort === 'ASC'
          ? organizerASC(planetA[column], planetB[column])
          : organizerDESC(planetA[column], planetB[column])));
    setOrder(ordened);
  }

  function removeAllFilters() {
    setFilterNumber([]);
  }

  const providerValue = {
    planets,
    tableHeaders,
    filterName,
    filterNumber,
    filterConfig,
    INITIAL_COLUMNS,
    columns,
    orderPlanets,
    getPlanets,
    filterByName,
    filterNumberConfig,
    filterByNumber,
    deleteFilter,
    addFilter,
    enabledColumns,
    removeAllFilters,
    orderByNumber,
    orderConfig,
    setPlanets,
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
