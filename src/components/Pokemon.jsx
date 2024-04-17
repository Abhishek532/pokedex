import { useState } from "react"
import Axios from "axios"
export default function Pokemon() {

  const [pokemonName, setPokemonName] = useState("")

  const [pokemonData, setPokemonData] = useState({
    name: "",
    image: "",
    type: ""
  })

  const pokeTypeColors = {
    "normal": '#A8A77A',
    "fire": '#EE8130',
    "water": '#6390F0',
   "electric": '#F7D02C',
    "grass": '#7AC74C',
    "ice": '#96D9D6',
    "fighting": '#C22E28',
    "poison": '#A33EA1',
    "ground": '#E2BF65',
    "flying": '#A98FF3',
    "psychic": '#F95587',
    "bug": '#A6B91A',
    "rock": '#B6A136',
    "ghost": '#735797',
    "dragon": '#6F35FC',
    "dark": '#705746',
    "steel": '#B7B7CE',
    "fairy": '#D685AD',
  }

  function colorSetter(colorObject, type) {
    for (let prop in colorObject) {
      if (prop === type) {
        return colorObject[prop];
      }
    }
    return null;
  }
  var errMsg = ""
  const searchPokemon = (e) => {
    e.preventDefault()
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .then((response) =>setPokemonData({
      name: pokemonName,
      image: response.data.sprites.front_default,
      type: response.data.types[0].type.name
    }))
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        errMsg = "No such Pokemon"
      }
    })
  }

  return (
    <> 
      <div className="mx-auto max-w-lg text-center">
        <h1 className="font-semibold text-4xl mt-20"> Search for a Pokemon!</h1>
        <h1>{errMsg}</h1>
        <form onSubmit={searchPokemon}>
          <input
            type="text"
            onChange= {(e) => setPokemonName(e.target.value)}
            className="border rounded-md p-3 border-red-500 w-full mt-6"
          />

          <button 
            onClick={searchPokemon}
            className="border-2 rounded-md py-2 px-6 mt-2 border-red-500
             bg-red-500 text-white  hover:text-red-500 hover:bg-white duration-150 
             font-bold tracking-wider ">
            Find
          </button>
        </form>

        <div 
          className="w-1/2 mx-auto my-20 flex flex-col p-8"
          style={{
            backgroundColor: colorSetter(pokeTypeColors, pokemonData.type),
          }}
        >
          <h1 className="text-4xl">{pokemonData.name.toUpperCase()}</h1>
          <img src={pokemonData.image}/>
          <p className="font-semibold"> {pokemonData.type.toUpperCase()}</p>
        </div>

      </div>
    </> 
  )
  
}