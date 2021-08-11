export const searchPokemon = async (pokemon) => {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {}
};

export const getPokemons = async (limit = 10, offset = 0) => {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const getPokemonData = async (url) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse;
};
