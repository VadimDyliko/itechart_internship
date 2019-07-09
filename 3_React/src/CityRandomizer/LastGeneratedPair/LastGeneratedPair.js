import React from 'react';
import './LastGeneratedPair.css'

const LastGeneratedPair = (props) =>{
  return(
    <input className="city-randomizer__last-gerated-pair" type="text" value={props.lastPair} readOnly></input>
  )
}

export default LastGeneratedPair
