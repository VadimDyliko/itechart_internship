import React from 'react';
import './AllGeneratedPairs.css';

const AllGeneratedPairs = (props) =>{
  return(
    <textarea className="city-randomizer__all-generated-pairs" defaultValue={
        props.generatedPairs.map((item,i)=>{
          return `\n${i+1}) ${item}`
        })
      }></textarea>
  )
}

export default AllGeneratedPairs
