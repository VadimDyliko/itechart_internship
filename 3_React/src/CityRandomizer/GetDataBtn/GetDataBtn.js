import React from 'react';
import './GetDataBtn.css';
import classNames from 'classnames'

class GetDataBtn extends React.PureComponent{
  render(){
    let btnClass = classNames({
      'city-randomizer__get-data-button': this.props.isBtnEnable,
      'city-randomizer__get-data-button_disabled': !this.props.isBtnEnable
    });
    return(
      <button className={btnClass} onClick={(this.props.isBtnEnable)?this.props.action:null}>Generate pair</button>
    )
  }
}

export default GetDataBtn
