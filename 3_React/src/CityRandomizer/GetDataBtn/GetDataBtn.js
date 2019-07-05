import React from 'react';
import './GetDataBtn.css';

const GetDataBtn = (props) =>{
  return(
        <button className={(props.isBtnEnable)?'city-randomizer__get-data-button':'city-randomizer__get-data-button_disabled'} onClick={(props.isBtnEnable)?props.action:null}>Generate pair</button>
  )
}

export default GetDataBtn
