import React from 'react'

class Spiner extends React.PureComponent {
  render () {
    return(
      <div className="content__spiner" style={{position: 'absolute',  top: '50%'}}>
        < div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}

export default Spiner;
