import React, { useContext, useEffect } from 'react';
import ApiContext from '../context/ApiContext';

function Planets() {
  const { getPlanets,
    planets,
    tableHeaders,
    filterByName,
    filterName } = useContext(ApiContext);

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
      <table>
        <tr>
          {tableHeaders.map((tableHeader) => <th key={ tableHeader }>{tableHeader}</th>)}
        </tr>
        {planets.map((planet) => (
          <tr key={ planet }>
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
