import React, { useContext, useEffect } from 'react';
import ApiContext from '../context/ApiContext';

function Planets() {
  const { getPlanets,
    planets,
    tableHeaders,
    filterByName,
    filterName,
    filterNumber,
    filterByNumber,
    filterNumberConfig } = useContext(ApiContext);

  useEffect(() => {
    getPlanets();
  }, []);

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
        value={ filterNumber.column }
        onChange={ filterNumberConfig }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ filterNumber.comparison }
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
        value={ filterNumber.value }
        onChange={ filterNumberConfig }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterByNumber }
      >
        FILTRAR
      </button>
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
