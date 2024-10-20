import React from 'react'

const Pokemon =({name,ruta})=>{

  return (
    <>
    <div className='nombre'>
      <div className='imagen_pokemon'>
        <img src={ruta} alt="imagen"/>
      </div>
      <h4>Hello {name}</h4>
    </div>
    </>
  )
}

export default Pokemon
