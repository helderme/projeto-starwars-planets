import React, { useContext, useEffect } from 'react';
import Filters from '../components/Filters';
import ApiContext from '../context/ApiContext';

function Planets() {
  const { getPlanets,
    planets,
    tableHeaders,
    filterByName,
    filterName,
    filterNumber,
    filterByNumber,
    addFilter,
    filterConfig,
    filterNumberConfig,
    enabledColumns,
    INITIAL_COLUMNS,
    columns,
    removeAllFilters,
    orderByNumber,
    orderConfig,
    orderPlanets,
    setPlanets } = useContext(ApiContext);

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    filterByNumber();
    enabledColumns();
  }, [filterNumber]);

  useEffect(() => {
    setPlanets(orderPlanets);
  }, [orderPlanets]);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        value={ filterName.filterByName.name }
        onChange={ filterByName }
      />
      <label htmlFor="column">
        Column:
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          value={ filterConfig.column }
          onChange={ filterNumberConfig }
        >
          {columns.map((column) => <option key={ column }>{column}</option>)}
        </select>
      </label>

      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ filterConfig.comparison }
        onChange={ filterNumberConfig }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        value={ filterConfig.value }
        onChange={ filterNumberConfig }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ addFilter }
      >
        FILTRAR
      </button>
      <label htmlFor="column-sort">
        Order:
        <select
          id="column-sort"
          name="order"
          data-testid="column-sort"
          onChange={ orderConfig }
        >
          {INITIAL_COLUMNS.map((column) => <option key={ column }>{column}</option>)}
        </select>
      </label>
      <label htmlFor="ASC">
        Ascending
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          id="ASC"
          onChange={ orderConfig }
        />
      </label>
      <label htmlFor="DESC">
        Descending
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          id="DESC"
          onChange={ orderConfig }
        />
      </label>
      <button type="button" data-testid="column-sort-button" onClick={ orderByNumber }>
        ORDER
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        REMOVER FILTROS
      </button>
      <Filters />
      <table>
        <tr>
          {tableHeaders.map((tableHeader) => <th key={ tableHeader }>{tableHeader}</th>)}
        </tr>
        {planets.map((planet) => (
          <tr
            key={ planet.name }
          >
            {tableHeaders.map((tableHeader) => (
              tableHeader === 'name'
                ? <td key={ planet[tableHeader] } data-testid="planet-name">
                  {planet[tableHeader]}
                </td>
                : <td key={ planet[tableHeader] }>
                  {planet[tableHeader]}
                </td>
            ))}
          </tr>))}
      </table>
    </div>
  );
}

export default Planets;
