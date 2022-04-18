async function fetchPlanets() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export default fetchPlanets;
