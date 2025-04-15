import React from 'react'
import PokemonCard from './PokemonCard'
import { useState,useEffect } from 'react';

export default function PokemonField() {
    const API = 'https://pokeapi.co/api/v2/pokemon?limit=32' ;
    const [pokemon,setPokemon] = useState([]);
    const [searchName,setSearchName] = useState('');

    function handleInput(event){
        console.log(event.target.value);
        setSearchName(event.target.value);
    }

    const fetchPokemon = async()=>{
        try {
            const response = await fetch(API);
            const data = await response.json();
            
            const detailedPokemonData = data.results.map(async(curr)=>{
                const response = await fetch(curr.url);
                const data  = await response.json();
                return data;
            })

            let dataOfAllPokemon = await Promise.all(detailedPokemonData);
            console.log(dataOfAllPokemon);

            setPokemon(dataOfAllPokemon)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchPokemon();
    },[]);

    let filterPokemon = pokemon.filter((currPokemon)=>currPokemon.name.toLowerCase().includes(searchName.toLowerCase()));

    if(pokemon){
        return (
            <>
                <h1>Let's Catch Pokemon</h1>
                <input type="text" className='inputField' value={searchName} onChange={handleInput} placeholder='Search Pokemon'/>
                <div className='pokemonCards'>
                    <ul>
                        {
                            filterPokemon ? filterPokemon.map((currPokemon)=>{
                                return <li key={currPokemon.id}><PokemonCard pokemonUrl = {currPokemon}/></li>
                            }) :
                            filterPokemon.map((currPokemon)=>{
                                console.log(currPokemon)
                                return <li key={currPokemon.id}><PokemonCard pokemonUrl = {currPokemon}/></li>
                            })
                        }
                    </ul>
                </div>
            </>
        )
    }
    
}
