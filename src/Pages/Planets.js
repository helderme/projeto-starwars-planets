import React, { useContext, useEffect } from 'react';
import ApiContext from '../context/ApiContext';

function Planets() {
  const { getPlanets, planets, tableHeaders } = useContext(ApiContext);
  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <div>
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

/*     const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data); */
export default Planets;
