import React from 'react'
import './PokemonCard.css';

export default function PokemonCard({pokemonUrl}) {

        return (
            <>
            <div className='container'>
                <div className='pokemonImage'>
                    <img src={pokemonUrl.sprites.other.dream_world.front_default} alt={pokemonUrl.name} />
                </div>
    
                <div className='pokemonName'>
                    <h1>{pokemonUrl.name[0].toUpperCase()+pokemonUrl.name.slice(1)}</h1>
                </div>
    
                <div className='pokemonType'>
                    <h3>{pokemonUrl.types.map((curr,i,arr)=>{
                        if(i==arr.length-1){
                            return curr.type.name[0].toUpperCase()+curr.type.name.slice(1)
                        }
                        return curr.type.name[0].toUpperCase()+curr.type.name.slice(1)+','
                    })}</h3>
                </div>
                        
                <div className='pokemonDetails'>
                    <p>Weight :<span>{pokemonUrl.weight}</span></p>
                    <p>Height :<span>{pokemonUrl.height}</span></p>
                    <p>Speed : <span>{pokemonUrl.stats[5].base_stat}</span></p>
                    <p>Attack : <span>{pokemonUrl.stats[1].base_stat}</span></p>
                    <p>Abilities : <span>{pokemonUrl.abilities[0].ability.name}</span></p>
                    <p>Experience : <span>{pokemonUrl.base_experience}</span></p>
                </div>
            </div>
            </>
        )
}
