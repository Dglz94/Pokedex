import React, { useEffect, useState } from "react";
//Styles
import "./styles.css";
//Components
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";
//Api
import { getPokemons, getPokemonData, searchPokemon } from "./api";
import favoriteContext, { FavoriteProvider } from "./contexts/favoriteContext";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const localStorageKey = "favorite_pokemon";

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(25, 25 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25));
      setNotFound(false);
    } catch (error) {}
  };

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  };
  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setSearching(true);
    setNotFound(false);

    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        <Navbar />
        <div className="App">
          <Searchbar onSearch={onSearch} />
          {notFound ? (
            <div>no se encontro el pokemon</div>
          ) : (
            <Pokedex
              loading={loading}
              setPage={setPage}
              page={page}
              pokemons={pokemons}
              total={total}
            />
          )}
        </div>
      </div>
    </FavoriteProvider>
  );
}
