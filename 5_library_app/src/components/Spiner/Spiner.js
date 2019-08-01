import React from 'react'
import './Spiner.css'

class Spiner extends React.PureComponent {
  render() {
    return (
      <div className="content__spiner" style={{position: 'absolute',  top: '50%'}}>
          <div className="preloader"></div>
          <div className="spinner"></div>
      </div>
    )
  }
}

export default Spiner;
