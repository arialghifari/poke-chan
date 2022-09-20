import axios from 'axios';
import { useEffect, useState } from 'react';

function PokemonList() {
  const [pokemons, setPokemons] = useState();
  const [nextPage, setNextPage] = useState();

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => {
        console.log(response);
        setPokemons(response.data.results);
        setNextPage(response.data.next);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const renderNextPage = () => {
    axios
      .get(nextPage)
      .then((response) => {
        setPokemons((prevPokemons) => [
          ...prevPokemons,
          ...response.data.results,
        ]);
        setNextPage(response.data.next);
      })
      .catch((error) => console.log(error.message));
  };

  if (!pokemons)
    return <p className='text-center my-3 text-zinc-200'>Loading...</p>;
  console.log(pokemons.length);
  return (
    <div className='mx-auto max-w-xl flex flex-col gap-y-2 p-3'>
      <h1 className='text-xl text-zinc-200'>Poke Chan</h1>
      {pokemons.map((pokemon) => (
        <button
          key={pokemon.name}
          className='block w-full uppercase p-3 rounded-sm shadow-sm bg-zinc-600 hover:bg-rose-700 text-zinc-200 transition ease-in-out duration-150'
        >
          {pokemon.name}
        </button>
      ))}

      {pokemons.length < 1154 ? (
        <button
          onClick={() => renderNextPage()}
          className='block w-full p-3 rounded-sm shadow-sm text-zinc-500 ease-in-out duration-150 animate-pulse'
        >
          loading...
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default PokemonList;
