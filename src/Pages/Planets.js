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
    columns,
    removeAllFilters } = useContext(ApiContext);

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    filterByNumber();
    enabledColumns();
  }, [filterNumber]);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        value={ filterName.filterByName.name }
        onChange={ filterByName }
      />
      <select
        data-testid="column-filter"
        name="column"
        value={ filterConfig.column }
        onChange={ filterNumberConfig }
      >
        {columns.map((column) => <option key={ column }>{column}</option>)}
      </select>
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
          <tr key={ planet.name }>
            {tableHeaders.map((tableHeader) => (
              <td key={ planet[tableHeader] }>
                {planet[tableHeader]}
              </td>))}
          </tr>))}
      </table>
    </div>
  );
}

export default Planets;
