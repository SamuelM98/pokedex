import React, { useEffect, useRef, useState } from 'react'
import Pokemon from './Componentes/Pokemon'
import './App.css'
const pokeball = require('./Images/pokeball.png')

const App =()=>{

  const refNumber = useRef();
  const [name, setName] = useState("");
  const [index, setIndex] = useState(0);
  const [image, setImage] = useState("");
  const [tipos, setTipos] = useState([]);
  const [peso, setPeso] = useState();
  const [loading, setLoading] = useState(true);

  const search=()=>{
    setLoading(true)
      
    if(Number(index)===0){
      setLoading(true)
    }else if(Number(index)<1026 && Number(index)>0){
      const url = 'https://pokeapi.co/api/v2/pokemon/'+index
      fetch(url)
      .then(info=>info.json())
      .then(data=>{
        setName(data.name)
        setImage(data.sprites.other.home.front_default)
        setTipos(data.types.map((tipo,indice)=>{
          return <h4 key={indice}>{indice+1}º Tipo: {tipo.type.name} </h4>
        }))
        setPeso(data.weight)
        setLoading(false)
      })
      .catch(e=>{
        console.log("Se produjo un error: "+e)
        setLoading(false)
      })
    }else{
      alert('No esxiste el pokemon')
      setIndex(0)
    }
  }

  useEffect(()=>{
    search();
  },[])

  const change=()=>{
    setIndex(refNumber.current.value)
  }

  return (
    <>
    <div className='pokedex'>
      <div className='pokedex-left'>
      <br/><br/><br/>
        <div class="camera"></div>
        <div class="indicators">
          <div class="indicator red"></div>
          <div class="indicator yellow"></div>
          <div class="indicator green"></div>
        </div>
        <div class="screen">
          <p class="pokemon-greeting">
            {loading ? (
              <h4 className='nombre'>Hello... <img className='pokebola' src={pokeball} alt="imagen"/></h4>
            ):(
              <Pokemon name={name} ruta={image} peso={peso} tipos={tipos}/>
            )}
          </p>
        </div>

        <div className='boton-buscar texto'>
          <label htmlFor="pokemon">Número en la Pokedex: </label>
          <input id="pokemon" type="number" ref={refNumber} onChange={change} value={index}/>
          <button className='buscar' onClick={search}>Buscar</button>
        </div>
      </div>

      <div class="pokedex-right">
        <div class="right-screen texto">
          {loading?(''
          ):(
            <h4>Peso: {peso} gr
            {tipos}</h4>
          )}
        </div>
        <div class="buttons">
          <div class="red-button"></div>
          <div class="yellow-button"></div>
          <div class="green-button"></div>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
