import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonDetail from './PokemonDetail';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonCount, setPokemonCount] = useState();
  const [detail, setDetail] = useState({ show: false, url: '' });
  let offset = 0;

  useEffect(() => {
    renderNextPage();
    window.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 0.1 >=
      document.documentElement.scrollHeight
    ) {
      renderNextPage();
    }
  };

  const renderNextPage = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then(({ data }) => {
        setPokemons((prevPokemons) =>
          offset > 0 ? [...prevPokemons, ...data.results] : data.results
        );
        setPokemonCount(data.count);
      })
      .catch((error) => console.log(error.message));

    offset += 20;
  };

  const showDetailPokemon = (url) => {
    setDetail({ show: true, url: url });
  };

  !pokemons && <p className='text-center my-3 text-zinc-200'>Loading...</p>;

  return (
    <div className='mx-auto max-w-xl flex p-3 flex-col gap-y-2'>
      <h1 className='text-5xl font-bold font-bungee my-3 text-center'>
        Poke-Chan
      </h1>
      {pokemons.map((pokemon) => (
        <button
          key={pokemon.name}
          className='block w-full uppercase p-3 rounded-sm shadow-sm bg-zinc-600 hover:bg-orange-600 text-zinc-200 transition-all'
          style={{ letterSpacing: '2px' }}
          onClick={() => showDetailPokemon(pokemon.url)}
        >
          <h2>{pokemon.name}</h2>
        </button>
      ))}

      {pokemons.length < pokemonCount ? (
        <p
          onClick={() => renderNextPage()}
          className='text-center block w-full pt-2 rounded-sm shadow-sm text-zinc-400 ease-in-out duration-150 animate-pulse'
        >
          loading...
        </p>
      ) : (
        ''
      )}

      {detail.show && <PokemonDetail setDetail={setDetail} url={detail.url} />}
    </div>
  );
}

export default PokemonList;
