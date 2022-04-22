import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';

function Filters() {
  const { filterNumber, deleteFilter } = useContext(ApiContext);
  return (
    filterNumber.map((filter) => (
      <div
        key={ filter.index }
        data-testid="filter"
      >
        <span>
          {`${filter.column} ${filter.comparison} ${filter.value}`}
        </span>
        <button
          type="button"
          onClick={ () => deleteFilter(filter.index) }
        >
          X
        </button>
      </div>))
  );
}

export default Filters;
