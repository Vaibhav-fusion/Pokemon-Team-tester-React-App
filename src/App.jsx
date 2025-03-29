import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'
import PokeCards from './PokeCards/PokeCards';

function App() {
  const [pokemonNames, setPokemonNames] = useState(["", "", "", "", "", ""]);
  const [pokemonData, setPokemonData] = useState([]);
  const [showShiny, setShowShiny] = useState(false);


  const fetchPokemon = async () => {

    //test one
    // setTypeStorage([])
    //
    const fetchedData = [];

    for (const name of pokemonNames) {
      if (!name) continue;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) throw new Error(`${name}`);
        const data = await response.json();
        fetchedData.push(data);
      } catch (err) {
        console.log(err);
      }
    }


    setPokemonData(fetchedData); // Set the fetched data to pokemonData state

    console.log(fetchedData,"this is data")
  };

  const getRandomPokemon = async () => {
    const randomIds = Array.from({ length: 6 }, () => Math.floor(Math.random() * 1024) + 1);
    setPokemonNames(randomIds.map((id) => id.toString()));
  };

 
  return (<>
    <div className='main-container'>
      
      <div className='heading-top'>
      <h1 >Pokemon Team Tester</h1>
      <img src='../src/assets/1.png' style={{height:"50px"}} />
      </div>

      <div className='second_text'>
        <h2>Type in your Pokemon name/id no. or generate randomly to get a team!</h2>
      </div>

      <div className='input-container'>
        {pokemonNames.map((name, index) => (
          <input
            key={index}
            type='text'
            value={name}
            //input handling
            onChange={(e) => {
              const newNames = [...pokemonNames];
              newNames[index] = e.target.value;
              setPokemonNames(newNames);
            }}
            placeholder={`pokemon ${index + 1}`}
          />
        ))}
      </div>

      <div className='button-container'>
        <button onClick={fetchPokemon}>Fetch Pokemon</button>
        <button onClick={getRandomPokemon}>Random Pokemon</button>
        <button onClick={() => setShowShiny(!showShiny)} >
          {showShiny ? 'Normal Sprites' : 'Shiny Sprites'}
        </button>
      </div>

     <PokeCards pokemonData={pokemonData}  showShiny={showShiny} />



    <div className='footerr'>Disclaimer !@ This website purly a type simulator that doesn't account any abilites that effect type match up!</div>
    </div>
    
    </>
  )
}

export default App;