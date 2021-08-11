import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoriteContext";

export default function Pokemon({ pokemon }) {
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext);
  const redHeart = "❤️";
  const blackHeart = "🖤";
  const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart;

  const onClickHeart = (e) => {
    e.preventDefault();
    updateFavoritePokemons(pokemon.name);
  };
  console.log(pokemon);
  return (
    <div className="pokemon-card">
      <div className="pokemon-img">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <img src={pokemon.sprites.back_default} alt={pokemon.name} />
      </div>

      <div className="card-top">
        <h3>{pokemon.name}</h3>
      </div>
      <div class="id">#{pokemon.id}</div>
      <div className="pokemon-types">
        <h1>Type: </h1>
        {pokemon.types.map((type, idx) => {
          return (
            <div className="type" key={idx}>
              {type.type.name}
            </div>
          );
        })}
      </div>

      <button className="like-btn" onClick={onClickHeart}>
        <div className="pokemon-favorite">{heart}</div>
      </button>
    </div>
  );
}
