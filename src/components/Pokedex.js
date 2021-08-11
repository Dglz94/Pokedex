import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";

export default function Pokedex({ pokemons, page, setPage, total, loading }) {
  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage);
  };
  const nextPage = () => {
    const nextPage = Math.min(page + 1, total);
    setPage(nextPage);
  };

  return (
    <div>
      <div className="header">
        <h1>Pokedex</h1>
        <Pagination
          page={page + 1}
          totalPages={111}
          onRightClick={lastPage}
          onLeftClick={nextPage}
        />
      </div>
      {loading ? (
        <div>Cargando Pokemones..</div>
      ) : (
        <div className="pokedex-grid">
          {pokemons.map((pokemon, idx) => {
            return <Pokemon key={pokemon.name} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
}
