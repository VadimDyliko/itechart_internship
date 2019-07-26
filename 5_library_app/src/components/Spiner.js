import React from 'react'

class Spiner extends React.PureComponent {
  render () {
    return(
      <div className="content__spiner" style={{position: 'absolute',  top: '50%'}}>
          <span className="sr-only">Loading...</span>
      </div>
    )
  }
}

export default Spiner;
