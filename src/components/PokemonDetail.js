import axios from 'axios';
import { useEffect, useState } from 'react';

function PokemonDetail({ url, setDetail }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => setPokemon(data))
      .catch((error) => console.log(error.message));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setDetail({ show: false, url: '' });
    setPokemon(null);
  };

  return (
    <div className='fixed top-0 right-0 left-0 w-full rounded'>
      <div
        className='fixed bg-zinc-800 opacity-90 left-0 right-0 top-0 h-screen w-full flex flex-col items-center'
        onClick={() => handleClose()}
      ></div>

      {pokemon && (
        <div className='relative max-w-xl mx-auto mt-5 p-3'>
          <button
            onClick={() => handleClose()}
            className='text-zinc-200 absolute right-0 -top-0 bg-orange-600 p-1 rounded-full border-2 border-transparent hover:border-zinc-200 transition-all'
          >
            <img src='/close_ic.svg' alt='Close' />
          </button>

          <div className='bg-zinc-600 rounded'>
            <div className='flex gap-4 p-4 flex-col sm:flex-row'>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className='w-36 h-36 bg-orange-200 rounded-sm shadow-lg'
              />
              <div className='text-zinc-100'>
                <p>#{pokemon.id}</p>
                <p
                  className='uppercase text-xl text-orange-400 font-bold py-2 drop-shadow-2xl'
                  style={{ letterSpacing: '2px' }}
                >
                  {pokemon.name}
                </p>
                <p className=' text-zinc-50'>
                  Base exp{' '}
                  <span className='font-semibold text-zinc-300'>
                    {pokemon.base_experience}
                  </span>
                </p>
                <p className=' text-zinc-50'>
                  Weight{' '}
                  <span className='font-semibold text-zinc-300'>
                    {pokemon.weight}
                  </span>
                </p>
                <p className=' text-zinc-50'>
                  Height{' '}
                  <span className='font-semibold text-zinc-300'>
                    {pokemon.height}
                  </span>
                </p>
              </div>
            </div>

            <div className='mt-5 bg-zinc-500 p-4 h-[320px] overflow-y-auto rounded grid grid-cols-1 sm:grid-cols-2'>
              <div>
                {/* STATS */}
                <div>
                  <p
                    className='uppercase text-orange-400 font-bold'
                    style={{ letterSpacing: '2px' }}
                  >
                    STATS
                  </p>
                  {pokemon.stats.map((stats) => (
                    <p key={stats.stat.name} className=' text-zinc-100'>
                      {stats.stat.name}{' '}
                      <span className='font-semibold text-zinc-300'>
                        {stats.base_stat}
                      </span>
                    </p>
                  ))}
                </div>

                {/* TYPES */}
                <div className='mt-5'>
                  <p
                    className='uppercase text-orange-400 font-bold'
                    style={{ letterSpacing: '2px' }}
                  >
                    TYPES
                  </p>
                  {pokemon.types.map(({ type }) => (
                    <p key={type.name} className=' text-zinc-100'>
                      {type.name}
                    </p>
                  ))}
                </div>

                {/* ABILITIES */}
                <div className='mt-5'>
                  <p
                    className='uppercase text-orange-400 font-bold'
                    style={{ letterSpacing: '2px' }}
                  >
                    ABILITIES
                  </p>
                  {pokemon.abilities.map(({ ability }) => (
                    <p key={ability.name} className=' text-zinc-100'>
                      {ability.name}
                    </p>
                  ))}
                </div>
              </div>

              {/* MOVES */}
              <div>
                <p
                  className='uppercase text-orange-400 font-bold'
                  style={{ letterSpacing: '2px' }}
                >
                  MOVES
                </p>
                {pokemon.moves.map(({ move }) => (
                  <p key={move.name} className=' text-zinc-100'>
                    {move.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
