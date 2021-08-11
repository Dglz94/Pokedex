import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoriteContext";

export default function Navbar() {
  const {favoritePokemons} = useContext(FavoriteContext);

  let urlImg =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  return (
    <nav>
      <img alt="PokéAPI" src={urlImg} className="navbar-img" />
      <div className="favorites">&#10084;&#65039; <div className="likes">{favoritePokemons.length}</div> </div>
    </nav>
  );
}
